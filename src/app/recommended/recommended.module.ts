import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecommendedRoutingModule } from '@app/recommended/recommended-routing.module';
import { RecommendedListComponent } from '@app/recommended/recommended-list/recommended-list.component';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  declarations: [RecommendedListComponent],
  imports: [
    CommonModule,
    RecommendedRoutingModule,
    CoreModule
  ]
})
export class RecommendedModule { }
