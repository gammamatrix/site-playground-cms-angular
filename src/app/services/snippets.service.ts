import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
// import { mockSnippetOne } from '../../../mock/snippets';
import { IndexParams, Snippet, Snippets } from '../app.types';
// import { SnippetResponse, ResponseShowMeta } from '../app.types';
import { ResponseIndexMeta, ResponseShowMeta } from '../app.types';
// import { SnippetsResponse } from '../app.types';
// import { SnippetRevision } from '../app.types';
// import { SnippetEditModel } from '../app.types';
// import { SnippetRevisionsResponse } from '../app.types';
// import { SnippetRevisionResponse } from '../app.types';
// import { User } from '../app.types';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnippetsService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = environment.apiUrl;
  protected snippets$: Snippet[] = [];
  protected snippetsMeta$: ResponseIndexMeta | undefined;

  protected snippet$: Snippet | undefined;
  protected snippetMeta$: ResponseShowMeta | undefined;

  // protected snippets$: BehaviorSubject<Snippet[] | null> = new BehaviorSubject(
  //   null
  // );

  getApiUrl(): string {
    console.log('SnippetsService.getApiUrl', { apiUrl: this.apiUrl });
    return this.apiUrl;
  }

  isReady(): boolean {
    console.log('SnippetsService.isReady', { apiUrl: this.apiUrl });
    return this.apiUrl.startsWith('http');
  }

  index(options?: IndexParams): Observable<Snippets> {
    return this.http
      .get<Snippets>(`${this.apiUrl}/snippets`, {
        params: {
          filters: options?.filters ?? [],
          offset: options?.offset ?? 0,
          page: options?.page ?? 1,
          perPage: options?.perPage ?? 10,
        },
      })
      .pipe(
        map((response: any) => {
          this.snippets$ = response['data'];
          this.snippetsMeta$ = response['meta'];
          console.log('SnippetsService.get()', {
            response: response,
            snippet: this.snippet$,
            snippetMeta: this.snippetMeta$,
          });
          return response['data'];
        })
      );
  }

  get(id: string): Observable<Snippet> {
    console.log('SnippetsService', {
      id: id,
      apiUrl: this.apiUrl,
    });
    return this.http.get<Snippet>(`${this.apiUrl}/snippets/${id}`).pipe(
      map((response: any) => {
        this.snippet$ = response['data'];
        this.snippetMeta$ = response['meta'];
        console.log('SnippetsService.get()', {
          response: response,
          snippet: this.snippet$,
          snippetMeta: this.snippetMeta$,
        });
        return response['data'];
      })
    );
  }

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
