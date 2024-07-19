import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Login as iLogin } from '../../../app.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isReady = false;
  model: iLogin = {
    email: '',
    password: '',
    // _token: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      _token: [this.service.getCsfrToken(), Validators.required],
    });
  }

  ngOnInit() {
    this.token();
    console.log('LoginComponent.ngOnInit', {
      isReady: this.isReady,
      loginForm: this.loginForm.value,
      this: this,
    });
  }

  onSubmit(): void {
    console.log('LoginComponent.onSubmit', {
      this: this,
      loginForm: this.loginForm.value,
      model: this.model,
    });
    this.login();
  }

  login() {
    this.model.email = this.loginForm.value.email;
    this.model.password = this.loginForm.value.password;
    this.service.login(this.model).subscribe(response => {
      console.log('LoginComponent.login', {
        this: this,
        response: response,
      });
    });
  }

  csrf() {
    this.service.csrf().subscribe(token => {
      this.isReady = true;
      console.log('LoginComponent.csrf - csrf', {
        this: this,
        token: token,
      });
    });
  }

  token() {
    // if (!this.model._token) {
    this.service.requestToken().subscribe(token => {
      // this.model._token = token;
      this.csrf();
      console.log('LoginComponent.token - requestToken', {
        this: this,
        token: token,
      });
    });
    // } else {
    //   this.csrf();
    //   this.isReady = true;
    // }
    console.log('LoginComponent.token', {
      this: this,
      // token: this.model._token,
    });
  }
}
