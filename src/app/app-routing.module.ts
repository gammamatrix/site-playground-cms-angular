import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesComponent } from './components/pages/pages.component';
import { SnippetsComponent } from './components/snippets/snippets.component';

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
  {
    path: 'snippets',
    component: SnippetsComponent,
    title: 'CMS Snippets',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
