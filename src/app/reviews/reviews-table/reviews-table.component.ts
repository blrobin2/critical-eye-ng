import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Review } from 'src/app/review';

@Component({
  selector: 'app-reviews-table',
  templateUrl: './reviews-table.component.html',
  styleUrls: ['./reviews-table.component.css']
})
export class ReviewsTableComponent implements OnInit {
  @Input() reviews: Review[];
  @Output() handleEdit: EventEmitter<Review> = new EventEmitter();
  @Output() handleDelete: EventEmitter<Review> = new EventEmitter();

  page = 1;
  pageSize = 10;

  constructor() { }

  ngOnInit() {
  }


}
