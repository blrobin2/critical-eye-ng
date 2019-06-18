import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendedListComponent } from '@app/recommended/recommended-list/recommended-list.component';

const routes: Routes = [
  { path: '', component: RecommendedListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendedRoutingModule { }
