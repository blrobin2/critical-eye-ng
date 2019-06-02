import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { StarReviewPipe } from './star-review.pipe';
import { ReviewFormComponent } from './reviews/review-form/review-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewsTableComponent } from './reviews/reviews-table/reviews-table.component';
import { ReviewFormModalComponent } from './reviews/review-form-modal/review-form-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ReviewsComponent,
    StarReviewPipe,
    ReviewFormComponent,
    ReviewsTableComponent,
    ReviewFormModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
