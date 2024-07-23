import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SnippetsService } from './snippets.service';
import {
  mockSnippetOne,
  mockSnippetOneResponse,
  mockSnippetsOneResponse,
  mockSnippetRevisionsOneResponse,
} from '../../mock/snippets';
import { environment } from '../../environments/environment';
import { SnippetsIndexParams, SnippetRevisionsIndexParams } from '../app.types';

describe('SnippetsService', () => {
  let service: SnippetsService;
  let httpController: HttpTestingController;
  const url: string = environment.apiUrl;
  const id: string = mockSnippetOne.id ?? '';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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
    const service: SnippetsService = TestBed.get(SnippetsService);
    expect(service.getApiUrl()).toContain('//site-api-angular/api/cms');
  });

  it('should have isReady function', () => {
    const service: SnippetsService = TestBed.get(SnippetsService);
    expect(service.isReady()).toBeTrue();
  });

  it('should call createInfo and return an prefilled snippet', () => {
    service.createInfo().subscribe(response => {
      expect(response).toEqual(mockSnippetOne);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/snippets/create?owned_by_id=&parent_id=&snippet_type=`,
    });

    req.flush(mockSnippetOneResponse);
  });

  it('should call create and return a single snippet', () => {
    service.create(mockSnippetOne).subscribe(response => {
      expect(response).toEqual(mockSnippetOne);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/snippets`,
    });

    req.flush(mockSnippetOne);
  });

  it('should call delete and return a single snippet', () => {
    service.delete(mockSnippetOne).subscribe(response => {
      expect(response).toEqual(true);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/snippets/lock/${id}?force=1`,
    });

    req.flush(mockSnippetOne);
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

    req.flush(mockSnippetOne);
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

  it('should call unlock and return a single snippet', () => {
    service.unlock(mockSnippetOne).subscribe(response => {
      expect(response).toEqual(mockSnippetOne);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/snippets/lock/${id}`,
    });

    req.flush(mockSnippetOne);
  });

  it('should call update and return a single snippet', () => {
    service.update(mockSnippetOne).subscribe(response => {
      expect(response).toEqual(mockSnippetOne);
    });

    const req = httpController.expectOne({
      method: 'PATCH',
      url: `${url}/snippets/${id}`,
    });

    req.flush(mockSnippetOne);
  });
});
