import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarReviewPipe } from './star-review.pipe';
import { SortableDirective } from './sortable.directive';
import { AlbumSearchComponent } from './album-search/album-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    StarReviewPipe,
    SortableDirective,
    AlertComponent,
    AlbumSearchComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    StarReviewPipe,
    SortableDirective,
    AlertComponent,
    AlbumSearchComponent
  ]
})
export class CoreModule { }
