import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms'; // Adding FormsModule

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
// import { ServicesModule } from './services/services.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesComponent } from './components/pages/pages.component';
import { PagesCreateComponent } from './components/pages/create/create.component';
import { PagesEditComponent } from './components/pages/edit/edit.component';
import { SnippetsComponent } from './components/snippets/snippets.component';
import { SnippetsCreateComponent } from './components/snippets/create/create.component';
import { SnippetsEditComponent } from './components/snippets/edit/edit.component';
import {
  HttpClientModule,
  HttpClientXsrfModule,
  // HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { SnippetsService } from './services/snippets.service';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { RevisionsComponent as SnippetRevisionsComponent } from './components/snippets/revisions/revisions.component';
import { RevisionsComponent as PageRevisionsComponent } from './components/pages/revisions/revisions.component';
import { PreviewComponent as PageRevisionPreviewComponent } from './components/pages/revisions/preview.component';
import { PreviewComponent as SnippetRevisionPreviewComponent } from './components/snippets/revisions/preview.component';
// import { CsrfInterceptorService } from './services/csrf-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PagesComponent,
    PagesCreateComponent,
    PagesEditComponent,
    SnippetsComponent,
    SnippetsCreateComponent,
    SnippetsEditComponent,
    LoginComponent,
    LogoutComponent,
    SnippetRevisionPreviewComponent,
    SnippetRevisionsComponent,
    PageRevisionPreviewComponent,
    PageRevisionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    LayoutModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    _MatSlideToggleRequiredValidatorModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [
    SnippetsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CsrfInterceptorService,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
