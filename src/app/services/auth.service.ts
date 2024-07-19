import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {
  AuthToken as iAuthToken,
  CreateToken as iCreateToken,
  // CsfrToken as iCsfrToken,
  Login as iLogin,
  // SessionToken as iSessionToken,
} from '../app.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl: string = environment.authUrl;

  constructor(
    private http: HttpClient,
    public router: Router
  ) {}

  login(auth: iLogin): Observable<boolean> {
    return this.http
      .post<iAuthToken>(this.authUrl + '/api/login', auth, {
        withCredentials: true,
      })
      .pipe(
        map(result => {
          localStorage.setItem('app_token', result.token);
          localStorage.setItem('csrf_token', result.csrf_token);
          return true;
        })
      );
  }

  // createToken(): Observable<string> {
  //   return this.http
  //     .get<iCreateToken>(this.authUrl + '/api/tokens/create')
  //     .pipe(
  //       map(result => {
  //         localStorage.setItem('csrf_token', result.token);
  //         return result.token;
  //       })
  //     );
  // }

  requestToken(): Observable<string> {
    return this.http.get<iCreateToken>(this.authUrl + '/api/token').pipe(
      map(result => {
        localStorage.setItem('csrf_token', result.token);
        return result.token;
      })
    );
  }

  csrf(): Observable<boolean> {
    return this.http.get(this.authUrl + '/api/sanctum/csrf-cookie').pipe(
      map(result => {
        console.log('AuthService.csrf', {
          result: result,
        });
        return true;
      })
    );
  }

  getCsfrToken(): string {
    const csrf_token = localStorage.getItem('csrf_token');
    return csrf_token ?? '';
  }

  logout() {
    const removeToken = localStorage.removeItem('csrf_token');

    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
}
