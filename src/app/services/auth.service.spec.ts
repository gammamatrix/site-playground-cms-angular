import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthToken as iAuthToken } from '../app.types';

describe('AuthService', () => {
  let httpController: HttpTestingController;
  let service: AuthService;
  const url: string = environment.authUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
      ],
      providers: [AuthService],
    });
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
});
