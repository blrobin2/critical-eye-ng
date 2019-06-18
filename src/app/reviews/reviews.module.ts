import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReviewsRoutingModule } from '@app/reviews/reviews-routing.module';
import { ReviewsComponent } from '@app/reviews/reviews/reviews.component';
import { ReviewsTableComponent } from '@app/reviews/reviews-table/reviews-table.component';
import { ReviewFormComponent } from '@app/reviews/review-form/review-form.component';
import { ReviewFormModalComponent } from '@app/reviews/review-form-modal/review-form-modal.component';
import { AuthInterceptor } from '@app/auth/auth.interceptor';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    ReviewsComponent,
    ReviewsTableComponent,
    ReviewFormModalComponent,
    ReviewFormComponent,
    ReviewDetailComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ReviewsRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }]
})
export class ReviewsModule { }
