import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  AuthToken as iAuthToken,
  CreateToken as iCreateToken,
  LogoutToken as iLogoutToken,
  Logout as iLogout,
} from '../app.types';
import { LoginComponent } from '../components/auth/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
// import { SnippetsComponent } from '../components/snippets/snippets.component';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let router: Router;
  let httpController: HttpTestingController;
  let service: AuthService;
  const url: string = environment.authUrl;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DashboardComponent },
          { path: 'login', component: LoginComponent },
          // { path: 'snippets', component: SnippetsComponent },
        ]),
      ],
      providers: [AuthService],
    });
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have isReady function', () => {
    expect(service.isReady()).toBeTrue();
  });

  it('should have getAuthUrl function that returns an API URL for Authentication', () => {
    expect(service.getAuthUrl()).toContain('//site-api-angular');
  });

  it('goToLogin should reroute', fakeAsync(() => {
    service.goToLogin();
    tick(1);
    expect(router.url).toBe(`/login`);
  }));

  it('goToDashboard should reroute', fakeAsync(() => {
    service.goToDashboard();
    tick(1);
    expect(router.url).toBe(`/dashboard`);
  }));

  it('navigate to "dashboard" takes you to /dashboard', fakeAsync(() => {
    router.navigate(['dashboard']);
    tick(1);
    expect(location.path()).toBe('/dashboard');
  }));

  it('should call login and return an auth token', () => {
    const auth: iAuthToken = {
      message: 'Authenticated',
      csrf_token: 'some-csrf-token',
      token: 'some-app-token',
    };
    service
      .login({
        email: 'test@example.com',
        password: 'password',
        _token: 'some-token',
      })
      .subscribe(response => {
        expect(response).toEqual(true);
      });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/api/login`,
    });

    req.flush(auth);
  });

  it('should call requestToken and return a token', () => {
    const createToken: iCreateToken = {
      token: 'some-csrf-token',
    };
    service.requestToken().subscribe(response => {
      expect(response).toEqual(createToken.token);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/api/token`,
    });

    req.flush(createToken);
  });

  it('should call csrfCookie and set a token', () => {
    service.csrfCookie().subscribe(response => {
      expect(response).toEqual(true);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/api/sanctum/csrf-cookie`,
    });

    req.flush(null);
  });

  it('should call logout and get a clear the session', () => {
    const logout: iLogout = {
      everywhere: false,
      session: true,
      storage: true,
    };
    const logoutToken: iLogoutToken = {
      everywhere: false,
      message: 'The session has expired.',
      csrf_token: '',
    };
    service.logout(logout).subscribe(response => {
      expect(response).toEqual(logoutToken);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/api/logout`,
    });

    req.flush(null);
  });
});
