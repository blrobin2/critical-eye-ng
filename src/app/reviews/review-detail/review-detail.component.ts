import { Component, OnInit } from '@angular/core';
import { Review } from '../review';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit {
  review: Review;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { review: Review }) => {
      this.review = data.review;
    });
  }
}
