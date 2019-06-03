import { Component, OnInit, Input, Output, EventEmitter, QueryList, ViewChildren } from '@angular/core';
import { Review } from 'src/app/review';
import { ReviewService } from 'src/app/review.service';
import { SortableDirective, SortEvent } from 'src/app/sortable.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reviews-table',
  templateUrl: './reviews-table.component.html',
  styleUrls: ['./reviews-table.component.css']
})
export class ReviewsTableComponent implements OnInit {
  // @Input() reviews: Review[];
  reviews$: Observable<Review[]>;
  total$: Observable<number>;

  selectedReview: Review = this.emptyReview;

  @Output() handleEdit: EventEmitter<Review> = new EventEmitter();
  @Output() handleDelete: EventEmitter<Review> = new EventEmitter();

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  page = 1;
  pageSize = 10;

  constructor(public reviewService: ReviewService) {
    this.reviews$ = reviewService.reviews$;
    this.total$ = reviewService.total$;
  }

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

  ngOnInit() {
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.appSortable !== column) {
        header.direction = '';
      }
    });

    this.reviewService.sortColumn = column;
    this.reviewService.sortDirection = direction;
  }

  setSelectedReview(review: Review) {
    this.selectedReview = review;
  }
}
