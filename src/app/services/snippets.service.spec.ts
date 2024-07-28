import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnippetsService } from './snippets.service';
import {
  mockSnippetOne,
  mockSnippetOneResponse,
  mockSnippetsOneResponse,
  mockSnippetRevisionOne,
  mockSnippetRevisionOneResponse,
  mockSnippetRevisionsOneResponse,
} from '../../mock/snippets';
import { environment } from '../../environments/environment';
import { SnippetsIndexParams, SnippetRevisionsIndexParams } from '../app.types';
import { take } from 'rxjs';
import { LoginComponent } from '../components/auth/login/login.component';

describe('SnippetsService', () => {
  let service: SnippetsService;
  let httpController: HttpTestingController;
  const url: string = environment.apiUrl;
  const id: string = mockSnippetOne.id ?? '';
  const id_revision: string = mockSnippetRevisionOne.id ?? '';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
      ],
      providers: [SnippetsService],
    });
    service = TestBed.inject(SnippetsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const service: SnippetsService = TestBed.inject(SnippetsService);
    expect(service).toBeTruthy();
  });

  it('should have getApiUrl function that returns an API URL', () => {
    expect(service.getApiUrl()).toContain('//site-api-angular/api/cms');
  });

  it('should have isReady function', () => {
    expect(service.isReady()).toBeTrue();
  });

  it('handleError should handle authentication errors', () => {
    const error = new HttpErrorResponse({
      status: 401,
      error: { error: 'Unauthorized' },
    });

    service
      .handleError(error)
      .pipe(take(1))
      .subscribe({
        error: error => {
          expect(error).toBeTruthy();
          true;
        },
      });
  });

  it('handleError should handle errors', () => {
    const error = new HttpErrorResponse({
      status: 423,
      error: { message: 'Locked', error: 'Locked' },
    });

    service
      .handleError(error)
      .pipe(take(1))
      .subscribe({
        error: error => {
          expect(error).toBeTruthy();
          true;
        },
      });
  });

  it('should call createInfo and return a prefilled snippet', () => {
    service.createInfo().subscribe(response => {
      expect(response).toEqual(mockSnippetOne);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/snippets/create?owned_by_id=&parent_id=&snippet_type=`,
    });

    req.flush(mockSnippetOneResponse);
  });

  it('should call create and return a base snippet', () => {
    service.create(mockSnippetOne).subscribe(response => {
      expect(response).toEqual(mockSnippetOne);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/snippets`,
    });

    req.flush(mockSnippetOneResponse);
  });

  it('should call delete and return true', () => {
    service.delete(mockSnippetOne).subscribe(response => {
      expect(response).toEqual(true);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/snippets/${id}?force=1`,
    });

    req.flush(true);
  });

  it('should call editInfo and return an prefilled snippet', () => {
    service.editInfo(id).subscribe(response => {
      expect(response).toEqual(mockSnippetOne);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/snippets/edit/${id}`,
    });

    req.flush(mockSnippetOneResponse);
  });

  it('should call get and return a single snippet', () => {
    service.get(id).subscribe(response => {
      expect(response).toEqual(mockSnippetOne);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/snippets/${id}`,
    });

    req.flush(mockSnippetOneResponse);
  });

  it('should call index and return the full response with data, links and meta', () => {
    const options: SnippetsIndexParams = {
      perPage: 10,
      page: 1,
      offset: 0,
      filter: {
        trash: '',
      },
    };

    service.index(options).subscribe(response => {
      expect(response).toEqual(mockSnippetsOneResponse);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/snippets/index`,
    });

    req.flush(mockSnippetsOneResponse);
  });

  it('should call lock and return a single snippet', () => {
    service.lock(mockSnippetOne).subscribe(response => {
      expect(response).toEqual(mockSnippetOne);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/snippets/lock/${id}`,
    });

    req.flush(mockSnippetOneResponse);
  });

  it('should call revisions and return the full response with data, links and meta', () => {
    const options: SnippetRevisionsIndexParams = {
      perPage: 10,
      page: 1,
      offset: 0,
      filter: {
        trash: '',
      },
    };

    service.revisions(id, options).subscribe(response => {
      expect(response).toEqual(mockSnippetRevisionsOneResponse);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/snippets/${id}/revisions`,
    });

    req.flush(mockSnippetRevisionsOneResponse);
  });

  it('should call restore and return one item from the trash', () => {
    service.restore(mockSnippetOne).subscribe(response => {
      expect(response).toEqual(mockSnippetOne);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/snippets/restore/${id}`,
    });

    req.flush(mockSnippetOneResponse);
  });

  it('should call revision and return a snippet revision', () => {
    service.revision(mockSnippetRevisionOne.id).subscribe(response => {
      expect(response).toEqual(mockSnippetRevisionOne);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/snippets/revision/${id_revision}`,
    });

    req.flush(mockSnippetRevisionOneResponse);
  });

  it('should call restoreRevision and return the restored snippet', () => {
    service.restoreRevision(mockSnippetRevisionOne.id).subscribe(response => {
      expect(response).toEqual(mockSnippetOne);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/snippets/revision/${id_revision}`,
    });

    req.flush(mockSnippetOneResponse);
  });

  it('should call trash and return true', () => {
    service.trash(mockSnippetOne).subscribe(response => {
      expect(response).toEqual(true);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/snippets/${id}`,
    });

    req.flush(true);
  });

  it('should call unlock and return a single snippet', () => {
    service.unlock(mockSnippetOne).subscribe(response => {
      expect(response).toEqual(mockSnippetOne);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/snippets/lock/${id}`,
    });

    req.flush(mockSnippetOneResponse);
  });

  it('should call update and return a single snippet', () => {
    service.update(mockSnippetOne).subscribe(response => {
      expect(response).toEqual(mockSnippetOne);
    });

    const req = httpController.expectOne({
      method: 'PATCH',
      url: `${url}/snippets/${id}`,
    });

    req.flush(mockSnippetOneResponse);
  });
});
