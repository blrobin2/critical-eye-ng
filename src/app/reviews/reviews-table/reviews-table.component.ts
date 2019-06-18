import {
  Component,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ViewChildren
} from '@angular/core';

import { Review } from '@app/reviews/review';
import { SortableDirective, SortEvent } from '@app/core/sortable.directive';

@Component({
  selector: 'app-reviews-table',
  templateUrl: './reviews-table.component.html',
  styleUrls: ['./reviews-table.component.css']
})
export class ReviewsTableComponent {
  @Input() reviews: Review[];
  @Input() total: number;
  @Input() loading: boolean;
  @Input() selectedReview: Review;
  @Input() searchTerm: string;
  @Input() pageSize: number;
  @Input() page: number;

  @Output() handleSearch = new EventEmitter();
  @Output() handleSelect: EventEmitter<Review> = new EventEmitter();
  @Output() handleDelete: EventEmitter<Review> = new EventEmitter();
  @Output() handleSort: EventEmitter<SortEvent> = new EventEmitter();
  @Output() handlePageSize = new EventEmitter();
  @Output() handlePage = new EventEmitter();

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.appSortable !== column) {
        header.direction = '';
      }
    });

    this.handleSort.emit({ column, direction });
  }
}
