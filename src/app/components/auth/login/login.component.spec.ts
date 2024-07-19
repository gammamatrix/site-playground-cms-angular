import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        // NoopAnimationsModule,
        // ReactiveFormsModule,
        // MatButtonModule,
        // MatCardModule,
        // MatDatepickerModule,
        // MatNativeDateModule,
        // MatProgressSpinnerModule,
        // MatIconModule,
        // MatInputModule,
        // MatRadioModule,
        // MatSelectModule,
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
