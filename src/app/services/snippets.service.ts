import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {
  IndexParams,
  Snippet,
  SnippetRequestCreateInfo,
  ResponseIndexMeta,
  ResponseShowMeta,
  SnippetsResponse,
  SnippetResponse,
} from '../app.types';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnippetsService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = environment.apiUrl;
  protected snippetsMeta: ResponseIndexMeta | undefined;

  protected snippet$: Observable<Snippet> | undefined;
  protected snippetMeta$: ResponseShowMeta | undefined;

  getApiUrl(): string {
    console.log('SnippetsService.getApiUrl', { apiUrl: this.apiUrl });
    return this.apiUrl;
  }

  isReady(): boolean {
    console.log('SnippetsService.isReady', { apiUrl: this.apiUrl });
    return this.apiUrl.startsWith('//');
  }

  index(options?: IndexParams): Observable<SnippetsResponse> {
    return this.http.get<SnippetsResponse>(`${this.apiUrl}/snippets`, {
      params: {
        filters: options?.filters ?? [],
        offset: options?.offset ?? 0,
        page: options?.page ?? 1,
        perPage: options?.perPage ?? 10,
      },
    });
  }

  get(id: string): Observable<Snippet> {
    console.log('SnippetsService.findOne', {
      id: id,
      apiUrl: this.apiUrl,
    });
    return this.http.get<SnippetResponse>(`${this.apiUrl}/snippets/${id}`).pipe(
      map((response: SnippetResponse) => {
        this.snippetMeta$ = response['meta'];
        console.log('SnippetsService.findOne() - this.showOne', {
          response: response,
        });
        return response.data;
      })
    );
  }

  createInfo(options?: SnippetRequestCreateInfo): Observable<Snippet> {
    const params = new HttpParams()
      .set('owned_by_id', options?.owned_by_id ?? '')
      .set('parent_id', options?.parent_id ?? '')
      .set('snippet_type', options?.snippet_type ?? '');
    console.log('SnippetsService.createInfo', {
      options: options,
      apiUrl: this.apiUrl,
    });
    return this.http
      .get<SnippetResponse>(`${this.apiUrl}/snippets/create`, {
        params: params,
      })
      .pipe(
        map((response: SnippetResponse) => {
          this.snippetMeta$ = response['meta'];
          console.log('SnippetsService.findOne() - this.showOne', {
            response: response,
          });
          return response.data;
        })
      );
  }

  // createInfo1(options?: SnippetRequestCreateInfo): Observable<Snippet> {
  //   const params = new HttpParams()
  //     .set('owned_by_id', options?.owned_by_id ?? '')
  //     .set('parent_id', options?.parent_id ?? '')
  //     .set('snippet_type', options?.snippet_type ?? '');
  //   console.log('SnippetsService', {
  //     apiUrl: this.apiUrl,
  //     params: params,
  //     options: options,
  //   });
  //   return this.http
  //     .get<Snippet>(`${this.apiUrl}/snippets/create`, { params: params })
  //     .pipe(
  //       map((response: any) => {
  //         this.snippet$ = response['data'];
  //         this.snippetMeta$ = response['meta'];
  //         console.log('SnippetsService.get()', {
  //           response: response,
  //           snippet: this.snippet$,
  //           snippetMeta: this.snippetMeta$,
  //         });
  //         return response['data'];
  //       })
  //     );
  // }

  create(model: Snippet): Observable<Snippet> {
    return this.http.post<Snippet>(`${this.apiUrl}/snippets`, model);
  }

  update(model: Snippet): Observable<Snippet> {
    return this.http.patch<Snippet>(
      `${this.apiUrl}/snippets/${model.id}`,
      model
    );
  }
}
