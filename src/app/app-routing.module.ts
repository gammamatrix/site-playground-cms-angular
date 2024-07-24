import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesComponent } from './components/pages/pages.component';
import { PagesCreateComponent } from './components/pages/create/create.component';
import { PagesEditComponent } from './components/pages/edit/edit.component';
import { SnippetsComponent } from './components/snippets/snippets.component';
import { SnippetsCreateComponent } from './components/snippets/create/create.component';
import { SnippetsEditComponent } from './components/snippets/edit/edit.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { RevisionsComponent as SnippetRevisionsComponent } from './components/snippets/revisions/revisions.component';
import { RevisionsComponent as PageRevisionsComponent } from './components/pages/revisions/revisions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
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
    path: 'pages/revisions/:page_id',
    component: PageRevisionsComponent,
    title: 'CMS Page Revisions',
  },
  {
    path: 'pages/revisions/:page_id/trash/:trash',
    component: PageRevisionsComponent,
    title: 'CMS Page Revisions Trash',
  },
  {
    path: 'pages/trash/:trash',
    component: PagesComponent,
    title: 'CMS Pages Trash',
  },
  {
    path: 'pages/:page_type',
    component: PagesComponent,
    title: 'CMS Pages',
  },
  {
    path: 'pages/edit/:id',
    component: PagesEditComponent,
    title: 'CMS Edit a Page',
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
    path: 'snippets/revisions/:snippet_id',
    component: SnippetRevisionsComponent,
    title: 'CMS Snippet Revisions',
  },
  {
    path: 'snippets/revisions/:snippet_id/trash/:trash',
    component: SnippetRevisionsComponent,
    title: 'CMS Snippet Revisions Trash',
  },
  {
    path: 'snippets/trash/:trash',
    component: SnippetsComponent,
    title: 'CMS Snippets Trash',
  },
  {
    path: 'snippets/:snippet_type',
    component: SnippetsComponent,
    title: 'CMS Snippets',
  },
  {
    path: 'snippets/edit/:id',
    component: SnippetsEditComponent,
    title: 'CMS Edit a Snippet',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'logout',
    component: LogoutComponent,
    title: 'Logout',
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
