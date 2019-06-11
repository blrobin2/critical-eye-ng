import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewsComponent } from './reviews/reviews.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ReviewsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
