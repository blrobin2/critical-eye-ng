import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarReviewPipe } from './star-review.pipe';
import { SortableDirective } from './sortable.directive';
import { AlbumSearchComponent } from './album-search/album-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './alert/alert.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    StarReviewPipe,
    SortableDirective,
    AlertComponent,
    AlbumSearchComponent,
    NavbarComponent
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
    NavbarComponent
  ]
})
export class CoreModule { }
