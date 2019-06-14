import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecommendedRoutingModule } from './recommended-routing.module';
import { RecommendedListComponent } from './recommended-list/recommended-list.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [RecommendedListComponent],
  imports: [
    CommonModule,
    RecommendedRoutingModule,
    CoreModule
  ]
})
export class RecommendedModule { }
