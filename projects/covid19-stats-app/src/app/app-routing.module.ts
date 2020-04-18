import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const defaultRoutePath = 'dashboard';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: defaultRoutePath
  },
  {
    path: defaultRoutePath,
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '**',
    redirectTo: defaultRoutePath
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
