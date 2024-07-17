import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
// import { mockSnippetOne } from '../../../mock/snippets';
import { IndexParams, Snippet, Snippets } from '../app.types';
// import { SnippetsResponse } from '../app.types';
// import { SnippetsResponse } from '../app.types';
// import { SnippetRevision } from '../app.types';
// import { SnippetEditModel } from '../app.types';
// import { SnippetRevisionsResponse } from '../app.types';
// import { SnippetRevisionResponse } from '../app.types';
// import { User } from '../app.types';

@Injectable({
  providedIn: 'root',
})
export class SnippetsService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = environment.apiUrl;

  protected snippetsList: Snippets = [];

  getApiUrl(): string {
    console.log('SnippetsService.getApiUrl', { apiUrl: this.apiUrl });
    return this.apiUrl;
  }

  isReady(): boolean {
    console.log('SnippetsService.isReady', { apiUrl: this.apiUrl });
    return this.apiUrl.startsWith('http');
  }

  index(options?: IndexParams): Observable<Snippets> {
    return this.http.get<Snippets>(`${this.apiUrl}/snippets`, {
      params: {
        filters: options?.filters ?? [],
        offset: options?.offset ?? 0,
        page: options?.page ?? 1,
        perPage: options?.perPage ?? 10,
      },
    });
  }

  get(id: string): Observable<Snippet> {
    console.log('SnippetsService', {
      id: id,
      apiUrl: this.apiUrl,
    });
    return this.http.get<Snippet>(`${this.apiUrl}/snippets/${id}`);
  }

  create(model: Snippet): Observable<Snippet> {
    return this.http.post<Snippet>(`${this.apiUrl}/snippets`, model);
  }

  update(model: Snippet): Observable<Snippet> {
    return this.http.post<Snippet>(
      `${this.apiUrl}/snippets/${model.id}`,
      model
    );
  }
}
