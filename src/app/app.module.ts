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
import { SortableDirective } from './sortable.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlbumSearchComponent } from './reviews/album-search/album-search.component';
import { ReviewFormModalComponent } from './reviews/review-form-modal/review-form-modal.component';
import { AuthInterceptor } from './http-interceptors/AuthInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    ReviewsComponent,
    StarReviewPipe,
    ReviewFormComponent,
    ReviewsTableComponent,
    SortableDirective,
    AlbumSearchComponent,
    ReviewFormModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
