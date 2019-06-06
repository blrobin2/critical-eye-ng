import { Component, OnInit } from '@angular/core';
import { Review } from './review';
import { Observable, Subject } from 'rxjs';
import { ReviewService } from './review.service';
import { SortEvent } from '../core/sortable.directive';
import { AlbumSearchService, AlbumSearchResult } from '../core/album-search/album-search.service';
import { AuthService } from '../core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../core/alert/alert.service';

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
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.handleAuth();
  }

  private handleAuth() {
    // If we have the token, we can just begin
    if (this.authService.getToken()) {
      this.startServices();
    } else {
      // If we have a fragment, we got it from spotify authenticating us
      // so we pass it on to our backend in order to get a token
      // And THEN we can start services
      this.route.queryParams.subscribe(params => {
        if (params.code) {
          this.authService.spotifyCallback(params.code).then(() => {
            this.alertService.addAlert({
              type: 'success',
              message: 'Successfully logged in!'
            });
            this.startServices();
          });
        }
      });
    }
  }

  private startServices() {
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

  saveReview(review: Review) {
    this.reviewService.saveReview(review).add(() => {
      this.selectedReview = this.emptyReview;
    });
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
    if (confirm(`Are you sure you wish to delete your review for ${review.artist} - ${review.album}?`)) {
      this.reviewService.deleteReview(review).add(() => {
        this.alertService.addAlert({
          type: 'info',
          message: 'Review deleted'
        });
        if (this.selectedReview._id === review._id) {
          this.selectedReview = this.emptyReview;
        }
      });
    }
  }

  changePageSize(size: string) {
    this.reviewService.pageSize = parseInt(size, 10);
  }

  changePage(page: string) {
    this.reviewService.page = parseInt(page, 10);
  }

  populateReviewForm(searchResult: AlbumSearchResult) {
    this.searchResults = [];
    this.selectedReview = Object.assign({}, this.emptyReview, searchResult);
  }
}
