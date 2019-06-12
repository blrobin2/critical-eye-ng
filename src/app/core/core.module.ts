import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarReviewPipe } from './star-review.pipe';
import { SortableDirective } from './sortable.directive';
import { AlbumSearchComponent } from './album-search/album-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    StarReviewPipe,
    SortableDirective,
    AlbumSearchComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class CoreModule { }
