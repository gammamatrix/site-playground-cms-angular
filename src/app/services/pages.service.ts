import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {
  PagesIndexParams,
  PageRevisionsIndexParams,
  Page,
  PageRevision,
  PageRequestCreateInfo,
  ResponseIndexMeta,
  ResponseShowMeta,
  SelectOptionString,
  PagesResponse,
  PageRevisionsResponse,
  PageResponse,
} from '../app.types';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = environment.apiUrl;
  protected pagesMeta: ResponseIndexMeta | undefined;

  protected page$: Observable<Page> | undefined;
  protected pageMeta$: ResponseShowMeta | undefined;

  public pageTypes: SelectOptionString[] = [
    { value: 'banner', label: 'Banner' },
    { value: 'slideshow', label: 'Slideshow' },
  ];

  getApiUrl(): string {
    console.debug('PagesService.getApiUrl', { apiUrl: this.apiUrl });
    return this.apiUrl;
  }

  isReady(): boolean {
    console.debug('PagesService.isReady', { apiUrl: this.apiUrl });
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
  createInfo(options?: PageRequestCreateInfo): Observable<Page> {
    const params = new HttpParams()
      .set('owned_by_id', options?.owned_by_id ?? '')
      .set('parent_id', options?.parent_id ?? '')
      .set('page_type', options?.page_type ?? '');
    console.debug('PagesService.createInfo', {
      options: options,
      apiUrl: this.apiUrl,
    });
    return this.http
      .get<PageResponse>(`${this.apiUrl}/pages/create`, {
        params: params,
      })
      .pipe(
        map((response: PageResponse) => {
          this.pageMeta$ = response['meta'];
          console.debug('PagesService.createInfo()', {
            response: response,
          });
          return response.data;
        }),
        catchError(this.handleError)
      );
  }

  create(model: Page): Observable<Page> {
    return this.http.post<Page>(`${this.apiUrl}/pages`, model);
  }

  delete(model: Page): Observable<boolean> {
    return this.http
      .delete<Page>(`${this.apiUrl}/pages/lock/${model.id}?force=1`)
      .pipe(
        map(() => {
          return true;
        })
      );
  }

  editInfo(id: string): Observable<Page> {
    console.debug('PagesService.findOne', {
      id: id,
      apiUrl: this.apiUrl,
    });
    return this.http.get<PageResponse>(`${this.apiUrl}/pages/edit/${id}`).pipe(
      map((response: PageResponse) => {
        this.pageMeta$ = response['meta'];
        console.debug('PagesService.get()', {
          response: response,
        });
        return response.data;
      })
    );
  }

  get(id: string): Observable<Page> {
    console.debug('PagesService.findOne', {
      id: id,
      apiUrl: this.apiUrl,
    });
    return this.http.get<PageResponse>(`${this.apiUrl}/pages/${id}`).pipe(
      map((response: PageResponse) => {
        this.pageMeta$ = response['meta'];
        console.debug('PagesService.get()', {
          response: response,
        });
        return response.data;
      })
    );
  }

  index(params: PagesIndexParams): Observable<PagesResponse> {
    return this.http.post<PagesResponse>(`${this.apiUrl}/pages/index`, params);
  }

  lock(model: Page): Observable<Page> {
    return this.http.put<Page>(`${this.apiUrl}/pages/lock/${model.id}`, null);
  }

  revisions(
    page_id: string,
    params: PageRevisionsIndexParams
  ): Observable<PageRevisionsResponse> {
    return this.http.post<PageRevisionsResponse>(
      `${this.apiUrl}/pages/${page_id}/revisions`,
      params
    );
  }

  revision(revision_id: string): Observable<PageRevision> {
    return this.http.get<PageRevision>(
      `${this.apiUrl}/pages/revision${revision_id}`
    );
  }

  restoreRevision(revision_id: string): Observable<Page> {
    return this.http.put<Page>(
      `${this.apiUrl}/pages/revision${revision_id}`,
      null
    );
  }

  unlock(model: Page): Observable<Page> {
    return this.http.delete<Page>(`${this.apiUrl}/pages/lock/${model.id}`);
  }

  update(model: Page): Observable<Page> {
    return this.http.patch<Page>(`${this.apiUrl}/pages/${model.id}`, model);
  }
}
