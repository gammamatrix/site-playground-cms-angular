import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {
  AuthToken as iAuthToken,
  CreateToken as iCreateToken,
  Login as iLogin,
  Logout as iLogout,
  LogoutToken as iLogoutToken,
} from '../app.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl: string = environment.authUrl;

  private auth = new ReplaySubject<boolean>(1);
  isAuthenticated: Observable<boolean> = this.auth.asObservable();

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
          this.auth.next(true);
          return true;
        })
      );
  }

  /**
   * Request a CSRF token for forms.
   *
   * @returns Observable<string> Returns the csrf token to submit in forms.
   */
  requestToken(): Observable<string> {
    return this.http.get<iCreateToken>(this.authUrl + '/api/token').pipe(
      map(result => {
        localStorage.setItem('csrf_token', result.token);
        return result.token;
      })
    );
  }

  /**
   * This Authentication API call sets up the session.
   *
   * Cookies created:
   * Set-Cookie: XSRF-TOKEN
   * Set-Cookie: _session
   *
   * @returns Observable<boolean> Returns true if a token was returned.
   */
  csrfCookie(): Observable<boolean> {
    return this.http.get(this.authUrl + '/api/sanctum/csrf-cookie').pipe(
      map(result => {
        console.log('AuthService.csrf', {
          result: result,
        });
        return true;
      })
    );
  }

  checkStatus() {
    console.log('AuthService.checkStatus', {
      this: this,
    });
    if (this.hasAppToken()) {
      this.auth.next(true);
    } else {
      this.auth.next(false);
    }
  }

  hasAppToken(): boolean {
    const app_token = localStorage.getItem('app_token');
    console.log('AuthService.hasAppToken', {
      app_token: app_token,
      this: this,
    });
    return app_token ? true : false;
  }

  getCsrfToken(): string {
    const csrf_token = localStorage.getItem('csrf_token');
    return csrf_token ?? '';
  }

  logout(logout: iLogout): Observable<iLogoutToken> {
    if (logout.session) {
      sessionStorage.clear();
    }
    if (logout.storage) {
      localStorage.clear();
    }
    return this.http
      .post<iLogoutToken>(this.authUrl + '/api/logout', logout, {
        withCredentials: true,
      })
      .pipe(
        map(result => {
          localStorage.setItem('csrf_token', result.csrf_token);
          this.auth.next(false);
          return result;
        }),
        catchError(this.handleLogoutError)
      );
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToDashboard() {
    this.router.navigate(['dashboard']);
  }

  private handleLogoutError(
    error: HttpErrorResponse
  ): Observable<iLogoutToken> {
    let message = 'An error occurred';
    if (error.error.message) {
      message = error.error.message;
    } else if (error.error.error) {
      message = error.error.error;
    }
    console.error('AuthService.handleLogoutError', {
      message: message,
      error: error.error,
    });
    return of({
      everywhere: false,
      message: 'The session has expired',
      csrf_token: '',
    });
  }
}
