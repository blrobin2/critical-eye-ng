import { Component, OnInit, OnDestroy } from '@angular/core';
import { Review } from '../review';
import { Observable, Subject, Subscription } from 'rxjs';
import { ReviewService } from '../review.service';
import { SortEvent } from '../../core/sortable.directive';
import { AlbumSearchService, AlbumSearchResult } from '../../core/album-search/album-search.service';
import { AlertService } from '../../core/alert/alert.service';
import { DialogService } from 'src/app/core/dialog.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  reviews$: Observable<Review[]>;
  total$: Observable<number>;
  searchTerm$ = new Subject<string>();
  searchResults: AlbumSearchResult[];
  selectedReview: Review = this.emptyReview;

  openReviewModalOnLoad = false;
  albumSearch$: Subscription;
  queryParams$: Subscription;

  constructor(
    public reviewService: ReviewService,
    private albumSearchService: AlbumSearchService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.startServices();
  }

  ngOnDestroy() {
    this.stopServices();
  }

  private startServices() {
    this.reviewService.start();
    this.reviews$ = this.reviewService.reviews$;
    this.total$ = this.reviewService.total$;
    this.albumSearch$ = this.albumSearchService.search(this.searchTerm$)
      .subscribe(
        searchResults => {
          this.searchResults = searchResults;
        }, err => {
          this.alertService.addAlert({
            type: 'danger',
            message: 'Your Spotify session has expired, please log out and log in'
          });
          this.openReviewModalOnLoad = false;
        }
      );
    // If we pass along artist and album, we want to search for that
    // album in the review modal
    this.queryParams$ = this.route.queryParamMap.subscribe(params => {
      const artist = params.get('artist');
      const album = params.get('album');
      if (artist && album) {
        this.searchTerm$.next(`${artist} ${album}`);
        this.openReviewModalOnLoad = true;
      }
    });
  }

  private stopServices() {
    this.albumSearch$.unsubscribe();
    this.queryParams$.unsubscribe();
    this.searchTerm$.unsubscribe();
  }

  get emptyReview() {
    return {
      album: '',
      artist: '',
      artwork: '',
      dateListened: new Date(),
      description: '',
      _id: '',
      rating: 0,
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
      this.openReviewModalOnLoad = false;
      this.router.navigate(['']);
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
    this.dialogService.confirm(message).subscribe((deleteIt: boolean) => {
      if (deleteIt) {
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
    });
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
