import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { StarReviewPipe } from './core/star-review.pipe';
import { ReviewFormComponent } from './reviews/review-form/review-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewsTableComponent } from './reviews/reviews-table/reviews-table.component';
import { SortableDirective } from './core/sortable.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlbumSearchComponent } from './core/album-search/album-search.component';
import { ReviewFormModalComponent } from './reviews/review-form-modal/review-form-modal.component';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { AlertComponent } from './core/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ReviewsComponent,
    StarReviewPipe,
    ReviewFormComponent,
    ReviewsTableComponent,
    SortableDirective,
    AlbumSearchComponent,
    ReviewFormModalComponent,
    AlertComponent
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
