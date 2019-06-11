import { Component, OnInit } from '@angular/core';
import { Review } from '../review';
import { Observable, Subject } from 'rxjs';
import { ReviewService } from '../review.service';
import { SortEvent } from '../../core/sortable.directive';
import { AlbumSearchService, AlbumSearchResult } from '../../core/album-search/album-search.service';
import { AlertService } from '../../core/alert/alert.service';
import { DialogService } from 'src/app/core/dialog.service';
import { tap } from 'rxjs/operators';

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
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.startServices();
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

  saveReview(review: Review) {
    this.reviewService.saveReview(review).add(() => {
      this.alertService.addAlert({
        type: 'success',
        message: 'Review saved'
      });
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
    const message = `Are you sure you wish to delete your review for:
${review.artist} - ${review.album}?`;
    this.dialogService.confirm(message).pipe(
      tap((deleteIt: boolean) => {
        if (deleteIt) {
          this.alertService.addAlert({
            type: 'info',
            message: 'Review deleted'
          });
          if (this.selectedReview._id === review._id) {
            this.selectedReview = this.emptyReview;
          }
        }
      })
    );
  }

  changePageSize(size: string) {
    this.reviewService.pageSize = +size;
  }

  changePage(page: string) {
    this.reviewService.page = +page;
  }

  populateReviewForm(searchResult: AlbumSearchResult) {
    this.searchResults = [];
    this.selectedReview = { ...this.emptyReview, ...searchResult };
  }
}
