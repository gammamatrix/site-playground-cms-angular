import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SnippetsService } from './snippets.service';
import {
  mockSnippetOne,
  mockSnippetsOne,
  mockSnippetOneResponse,
} from '../../mock/snippets';
import { environment } from '../../environments/environment';

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
    // expect(service.getApiUrl).toMatch('/^http/');
    expect(service.getApiUrl()).toContain(
      'http://site-playground-integration/mock/api/cms'
    );
  });

  it('should have isReady function', () => {
    const service: SnippetsService = TestBed.get(SnippetsService);
    expect(service.isReady()).toBeTrue();
  });

  it('should call index and return an array of a single snippet', () => {
    service.index().subscribe(response => {
      expect(response).toEqual(mockSnippetsOne);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/snippets?offset=0&page=1&perPage=10`,
    });

    req.flush(mockSnippetsOne);
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
