import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  // HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
// import { environment } from '../../environments/environment';

describe('AuthService', () => {
  // let httpController: HttpTestingController;
  let service: AuthService;
  // const url: string = environment.authUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    // httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
