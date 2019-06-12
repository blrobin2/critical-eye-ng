import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../review';
import { ReviewService } from '../review.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit {
  review$: Observable<Review>;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.review$ = this.reviewService.getReview(id);
  }
}
