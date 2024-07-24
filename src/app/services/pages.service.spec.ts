import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PagesService } from './pages.service';
import {
  mockPageOne,
  mockPageOneResponse,
  mockPagesOneResponse,
  mockPageRevisionsOneResponse,
} from '../../mock/pages';
import { environment } from '../../environments/environment';
import { PagesIndexParams, PageRevisionsIndexParams } from '../app.types';

describe('PagesService', () => {
  let service: PagesService;
  let httpController: HttpTestingController;
  const url: string = environment.apiUrl;
  const id: string = mockPageOne.id ?? '';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PagesService],
    });
    service = TestBed.inject(PagesService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const service: PagesService = TestBed.inject(PagesService);
    expect(service).toBeTruthy();
  });

  it('should have getApiUrl function that returns an API URL', () => {
    const service: PagesService = TestBed.get(PagesService);
    expect(service.getApiUrl()).toContain('//site-api-angular/api/cms');
  });

  it('should have isReady function', () => {
    const service: PagesService = TestBed.get(PagesService);
    expect(service.isReady()).toBeTrue();
  });

  it('should call createInfo and return an prefilled page', () => {
    service.createInfo().subscribe(response => {
      expect(response).toEqual(mockPageOne);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/pages/create?owned_by_id=&parent_id=&page_type=`,
    });

    req.flush(mockPageOneResponse);
  });

  it('should call create and return a single page', () => {
    service.create(mockPageOne).subscribe(response => {
      expect(response).toEqual(mockPageOne);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/pages`,
    });

    req.flush(mockPageOne);
  });

  it('should call delete and return a single page', () => {
    service.delete(mockPageOne).subscribe(response => {
      expect(response).toEqual(true);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/pages/lock/${id}?force=1`,
    });

    req.flush(mockPageOne);
  });

  it('should call editInfo and return an prefilled page', () => {
    service.editInfo(id).subscribe(response => {
      expect(response).toEqual(mockPageOne);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/pages/edit/${id}`,
    });

    req.flush(mockPageOneResponse);
  });

  it('should call get and return a single page', () => {
    service.get(id).subscribe(response => {
      expect(response).toEqual(mockPageOne);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/pages/${id}`,
    });

    req.flush(mockPageOneResponse);
  });

  it('should call index and return the full response with data, links and meta', () => {
    const options: PagesIndexParams = {
      perPage: 10,
      page: 1,
      offset: 0,
      filter: {
        trash: '',
      },
    };

    service.index(options).subscribe(response => {
      expect(response).toEqual(mockPagesOneResponse);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/pages/index`,
    });

    req.flush(mockPagesOneResponse);
  });

  it('should call lock and return a single page', () => {
    service.lock(mockPageOne).subscribe(response => {
      expect(response).toEqual(mockPageOne);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/pages/lock/${id}`,
    });

    req.flush(mockPageOne);
  });

  it('should call revisions and return the full response with data, links and meta', () => {
    const options: PageRevisionsIndexParams = {
      perPage: 10,
      page: 1,
      offset: 0,
      filter: {
        trash: '',
      },
    };

    service.revisions(id, options).subscribe(response => {
      expect(response).toEqual(mockPageRevisionsOneResponse);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/pages/${id}/revisions`,
    });

    req.flush(mockPageRevisionsOneResponse);
  });

  it('should call unlock and return a single page', () => {
    service.unlock(mockPageOne).subscribe(response => {
      expect(response).toEqual(mockPageOne);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/pages/lock/${id}`,
    });

    req.flush(mockPageOne);
  });

  it('should call update and return a single page', () => {
    service.update(mockPageOne).subscribe(response => {
      expect(response).toEqual(mockPageOne);
    });

    const req = httpController.expectOne({
      method: 'PATCH',
      url: `${url}/pages/${id}`,
    });

    req.flush(mockPageOne);
  });
});