import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {
  SnippetsIndexParams,
  SnippetRevisionsIndexParams,
  Snippet,
  SnippetRevision,
  SnippetRequestCreateInfo,
  ResponseIndexMeta,
  ResponseShowMeta,
  SelectOptionString,
  SnippetsResponse,
  SnippetRevisionsResponse,
  SnippetResponse,
} from '../app.types';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnippetsService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = environment.apiUrl;
  protected snippetsMeta: ResponseIndexMeta | undefined;

  protected snippet$: Observable<Snippet> | undefined;
  protected snippetMeta$: ResponseShowMeta | undefined;

  public snippetTypes: SelectOptionString[] = [
    { value: 'banner', label: 'Banner' },
    { value: 'slideshow', label: 'Slideshow' },
    { value: 'widget', label: 'Widget' },
  ];

  getApiUrl(): string {
    console.debug('SnippetsService.getApiUrl', { apiUrl: this.apiUrl });
    return this.apiUrl;
  }

  isReady(): boolean {
    console.debug('SnippetsService.isReady', { apiUrl: this.apiUrl });
    return this.apiUrl.startsWith('//');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
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
        }),
        catchError(this.handleError)
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

  index(params: SnippetsIndexParams): Observable<SnippetsResponse> {
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
    params: SnippetRevisionsIndexParams
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
