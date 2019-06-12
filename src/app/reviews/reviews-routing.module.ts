import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewsComponent } from './reviews/reviews.component';
import { AuthGuard } from '../auth/auth.guard';
import { ReviewDetailComponent } from './review-detail/review-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reviews',
    redirectTo: ''
  },
  {
    path: 'review/:id',
    component: ReviewDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
