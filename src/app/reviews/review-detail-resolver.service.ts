import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

import { Review } from '@app/reviews/review';
import { ReviewService } from '@app/reviews/review.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewDetailResolverService implements Resolve<Review> {

  constructor(
    private reviewService: ReviewService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Review> {
    const id = route.paramMap.get('id');
    return this.reviewService.getReview(id).pipe(
      take(1),
      mergeMap(review => {
        if (review) {
          return of(review);
        }
        this.router.navigate(['']);
        return EMPTY;
      })
    );
  }
}
