import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/auth/auth.guard';
import { ReviewsComponent } from '@app/reviews/reviews/reviews.component';
import { ReviewDetailComponent } from '@app/reviews/review-detail/review-detail.component';
import { ReviewDetailResolverService } from '@app/reviews/review-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: ReviewsComponent
      },
      {
        path: 'review/:id',
        component: ReviewDetailComponent,
        resolve: {
          review: ReviewDetailResolverService
        }
      }
    ]
  },
  {
    path: 'reviews',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
