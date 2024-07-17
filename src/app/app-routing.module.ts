import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesComponent } from './components/pages/pages.component';
import { PagesCreateComponent } from './components/pages/create/create.component';
import { SnippetsComponent } from './components/snippets/snippets.component';
import { SnippetsCreateComponent } from './components/snippets/create/create.component';
import { SnippetsEditComponent } from './components/snippets/edit/edit.component';

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
  {
    path: 'snippets/create',
    component: SnippetsCreateComponent,
    title: 'CMS Create a Snippet',
  },
  {
    path: 'snippets/edit/:id',
    component: SnippetsEditComponent,
    title: 'CMS Edit a Snippet',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
