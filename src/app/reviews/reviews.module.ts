import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsTableComponent } from './reviews-table/reviews-table.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { ReviewFormModalComponent } from './review-form-modal/review-form-modal.component';
import { StarReviewPipe } from '../core/star-review.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlbumSearchComponent } from '../core/album-search/album-search.component';
import { SortableDirective } from '../core/sortable.directive';

@NgModule({
  declarations: [
    StarReviewPipe,
    SortableDirective,
    ReviewsComponent,
    ReviewsTableComponent,
    ReviewFormModalComponent,
    ReviewFormComponent,
    AlbumSearchComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ReviewsRoutingModule
  ]
})
export class ReviewsModule { }
