import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {
  Logout as iLogout,
  // LogoutToken as iLogoutToken,
} from '../../../app.types';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  isReady = false;
  session: iLogout = {
    everywhere: false,
    session: true,
    storage: true,
  };
  constructor(private service: AuthService) {}

  ngOnInit() {
    this.logout();
    console.debug('LoginComponent.ngOnInit', {
      isReady: this.isReady,
      this: this,
    });
  }

  logout() {
    this.service.logout(this.session).subscribe(LogoutToken => {
      this.service.goToLogin();
      console.debug('LoginComponent.logout', {
        this: this,
        LogoutToken: LogoutToken,
      });
    });
  }
}
