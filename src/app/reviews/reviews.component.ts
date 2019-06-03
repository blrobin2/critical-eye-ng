import { Component, OnInit } from '@angular/core';
import { Review } from '../review';
import { Observable } from 'rxjs';
import { ReviewService } from '../review.service';
import { SortEvent } from '../sortable.directive';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews$: Observable<Review[]>;
  total$: Observable<number>;
  selectedReview: Review = this.emptyReview;

  constructor(public reviewService: ReviewService) {
    this.reviews$ = reviewService.reviews$;
    this.total$ = reviewService.total$;
  }

  ngOnInit() {}

  get emptyReview() {
    return {
      album: '',
      artist: '',
      artwork: '',
      dateListened: new Date(),
      description: '',
      id: '',
      rating: 5,
      spotifyId: '',
      yearReleased: '',
      href: ''
    };
  }

  searchReviews(term: string = '') {
    this.reviewService.searchTerm = term;
  }

  selectReview(review: Review) {
    // Deselect if selecting twice
    if (this.selectedReview.id === review.id) {
      this.selectedReview = this.emptyReview;
    } else {
      this.selectedReview = review;
    }
  }

  sortReviews({ column, direction }: SortEvent) {
    this.reviewService.sortColumn = column;
    this.reviewService.sortDirection = direction;
  }

  editReview(review: Review) {
    console.log(review);
  }

  deleteReview(review: Review) {
    console.log('delete', review);
  }
}
