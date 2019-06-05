import { Component, OnInit } from '@angular/core';
import { Review } from '../review';
import { Observable, Subject } from 'rxjs';
import { ReviewService } from '../review.service';
import { SortEvent } from '../sortable.directive';
import { AlbumSearchService, AlbumSearchResult } from '../album-search.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews$: Observable<Review[]>;
  total$: Observable<number>;
  searchTerm$ = new Subject<string>();
  searchResults: AlbumSearchResult[];
  selectedReview: Review = this.emptyReview;

  constructor(
    public reviewService: ReviewService,
    private albumSearchService: AlbumSearchService,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.authService.getToken()) {
      this.startItUp();
    } else {
      this.route.fragment.subscribe(fragment => {
        if (fragment) {
          this.authService.spotifyCallback(fragment).then(() => {
            this.startItUp();
          });
        }
      });
    }
  }

  private startItUp() {
    this.reviewService.start();
    this.reviews$ = this.reviewService.reviews$;
    this.total$ = this.reviewService.total$;
    this.albumSearchService.search(this.searchTerm$)
      .subscribe(searchResults => {
        this.searchResults = searchResults;
      });
  }

  get emptyReview() {
    return {
      album: '',
      artist: '',
      artwork: '',
      dateListened: new Date(),
      description: '',
      _id: '',
      rating: 5,
      spotifyId: '',
      yearReleased: '',
      href: ''
    };
  }

  handleLogin() {
    this.authService.login();
  }

  saveReview(review: Partial<Review>) {
    this.selectedReview = this.emptyReview;
  }

  searchReviews(term: string = '') {
    this.reviewService.searchTerm = term;
  }

  selectReview(review: Review) {
    // Deselect if selecting twice
    if (this.selectedReview._id === review._id) {
      this.selectedReview = this.emptyReview;
    } else {
      this.selectedReview = review;
    }
  }

  sortReviews({ column, direction }: SortEvent) {
    this.reviewService.sortColumn = column;
    this.reviewService.sortDirection = direction;
  }

  deleteReview(review: Review) {
    console.log('delete', review);
  }

  populateReviewForm(searchResult: AlbumSearchResult) {
    this.searchResults = [];
    this.selectedReview = Object.assign({}, this.emptyReview, searchResult);
  }
}
