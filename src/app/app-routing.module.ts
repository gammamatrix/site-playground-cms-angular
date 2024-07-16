import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesComponent } from './components/pages/pages.component';
import { PagesCreateComponent } from './components/pages/create/create.component';
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
    path: 'pages/create',
    component: PagesCreateComponent,
    title: 'CMS Create a Page',
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
