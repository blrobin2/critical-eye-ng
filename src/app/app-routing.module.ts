import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/auth/auth.guard';

const routes: Routes = [
  {
    path: 'recommended',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./recommended/recommended.module').then(mod => mod.RecommendedModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
