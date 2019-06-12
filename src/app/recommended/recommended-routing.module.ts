import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecommendedListComponent } from './recommended-list/recommended-list.component';

const routes: Routes = [
  { path: 'recommended', component: RecommendedListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendedRoutingModule { }
