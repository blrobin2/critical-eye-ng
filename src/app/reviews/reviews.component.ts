import { Component, OnInit } from '@angular/core';
import { Review } from '../review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {}

  editReview(review: Review) {
    console.log(review);
  }

  deleteReview(review: Review) {
    console.log('delete', review);
  }
}
