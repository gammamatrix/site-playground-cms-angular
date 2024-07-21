import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {
  IndexParams,
  Snippet,
  SnippetRevision,
  SnippetRequestCreateInfo,
  ResponseIndexMeta,
  ResponseShowMeta,
  SnippetsResponse,
  SnippetRevisionsResponse,
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
    console.debug('SnippetsService.getApiUrl', { apiUrl: this.apiUrl });
    return this.apiUrl;
  }

  isReady(): boolean {
    console.debug('SnippetsService.isReady', { apiUrl: this.apiUrl });
    return this.apiUrl.startsWith('//');
  }

  createInfo(options?: SnippetRequestCreateInfo): Observable<Snippet> {
    const params = new HttpParams()
      .set('owned_by_id', options?.owned_by_id ?? '')
      .set('parent_id', options?.parent_id ?? '')
      .set('snippet_type', options?.snippet_type ?? '');
    console.debug('SnippetsService.createInfo', {
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
          console.debug('SnippetsService.createInfo()', {
            response: response,
          });
          return response.data;
        })
      );
  }

  create(model: Snippet): Observable<Snippet> {
    return this.http.post<Snippet>(`${this.apiUrl}/snippets`, model);
  }

  delete(model: Snippet): Observable<boolean> {
    return this.http
      .delete<Snippet>(`${this.apiUrl}/snippets/lock/${model.id}?force=1`)
      .pipe(
        map(() => {
          return true;
        })
      );
  }

  editInfo(id: string): Observable<Snippet> {
    console.debug('SnippetsService.findOne', {
      id: id,
      apiUrl: this.apiUrl,
    });
    return this.http
      .get<SnippetResponse>(`${this.apiUrl}/snippets/edit/${id}`)
      .pipe(
        map((response: SnippetResponse) => {
          this.snippetMeta$ = response['meta'];
          console.debug('SnippetsService.get()', {
            response: response,
          });
          return response.data;
        })
      );
  }

  get(id: string): Observable<Snippet> {
    console.debug('SnippetsService.findOne', {
      id: id,
      apiUrl: this.apiUrl,
    });
    return this.http.get<SnippetResponse>(`${this.apiUrl}/snippets/${id}`).pipe(
      map((response: SnippetResponse) => {
        this.snippetMeta$ = response['meta'];
        console.debug('SnippetsService.get()', {
          response: response,
        });
        return response.data;
      })
    );
  }

  index(params: IndexParams): Observable<SnippetsResponse> {
    return this.http.post<SnippetsResponse>(
      `${this.apiUrl}/snippets/index`,
      params
    );
  }

  lock(model: Snippet): Observable<Snippet> {
    return this.http.put<Snippet>(
      `${this.apiUrl}/snippets/lock/${model.id}`,
      null
    );
  }

  revisions(
    snippet_id: string,
    params: IndexParams
  ): Observable<SnippetRevisionsResponse> {
    return this.http.post<SnippetRevisionsResponse>(
      `${this.apiUrl}/snippets/${snippet_id}/revisions`,
      params
    );
  }

  revision(revision_id: string): Observable<SnippetRevision> {
    return this.http.get<SnippetRevision>(
      `${this.apiUrl}/snippets/revision${revision_id}`
    );
  }

  restoreRevision(revision_id: string): Observable<Snippet> {
    return this.http.put<Snippet>(
      `${this.apiUrl}/snippets/revision${revision_id}`,
      null
    );
  }

  unlock(model: Snippet): Observable<Snippet> {
    return this.http.delete<Snippet>(
      `${this.apiUrl}/snippets/lock/${model.id}`
    );
  }

  update(model: Snippet): Observable<Snippet> {
    return this.http.patch<Snippet>(
      `${this.apiUrl}/snippets/${model.id}`,
      model
    );
  }
}
