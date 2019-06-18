import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StarReviewPipe } from '@app/core/star-review.pipe';
import { SortableDirective } from '@app/core/sortable.directive';
import { AlbumSearchComponent } from '@app/core/album-search/album-search.component';
import { AlertComponent } from '@app/core/alert/alert.component';
import { NavbarComponent } from '@app/core/navbar/navbar.component';

import { AlbumSearchResultComponent } from '@app/core/album-search/album-search-result/album-search-result.component';

@NgModule({
  declarations: [
    StarReviewPipe,
    SortableDirective,
    AlertComponent,
    AlbumSearchComponent,
    NavbarComponent,
    AlbumSearchResultComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ],
  exports: [
    StarReviewPipe,
    SortableDirective,
    AlertComponent,
    AlbumSearchComponent,
    AlbumSearchResultComponent,
    NavbarComponent
  ]
})
export class CoreModule { }
