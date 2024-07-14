import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesComponent } from './components/pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'CMS Dashboard',
  },
  {
    path: 'pages',
    component: PagesComponent,
    title: 'CMS Pages',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
