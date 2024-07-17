import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SnippetsService } from './snippets.service';
import { mockSnippetsOne } from '../../mock/snippets';
// import { mockSnippetOne, mockSnippetsOne } from '../../mock/snippets';
import { environment } from '../../environments/environment';

describe('SnippetsService', () => {
  let service: SnippetsService;
  let httpController: HttpTestingController;
  const url: string = environment.apiUrl;
  // const id = mockSnippetOne.id;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SnippetsService],
    });
    service = TestBed.inject(SnippetsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should call index and return an array of a sinle snippet', () => {
    service.index().subscribe(res => {
      expect(res).toEqual(mockSnippetsOne);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/snippets?offset=0&page=1&perPage=10`,
    });

    req.flush(mockSnippetsOne);
  });
  // const url = 'localhost:3000/';
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientTestingModule],
  //   });
  //   service = TestBed.inject(BooksService);
  // });
  // beforeEach(() =>
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientTestingModule],
  //     providers: [SnippetsService],
  //   }).compileComponents()
  // );
  it('should be created', () => {
    const service: SnippetsService = TestBed.get(SnippetsService);
    expect(service).toBeTruthy();
  });

  // it('should have isReady function', () => {
  //   const service: SnippetsService = TestBed.get(SnippetsService);
  //   expect(service.isReady).toBeTruthy();
  // });
  // let httpController: HttpTestingController;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientTestingModule],
  //     providers: [SnippetsService],
  //   });
  //   service = TestBed.inject(SnippetsService);
  // });
  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
