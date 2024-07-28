import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CMS Dashboard';

  public isReady = false;
  public isAuthenticated = false;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private service: AuthService
  ) {
    this.service.isAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      console.log('AppComponent.constructor', {
        isAuthenticated: isAuthenticated,
        service: this.service,
        this: this,
      });
    });
  }

  ngOnInit() {
    this.isReady = true;
    console.log('AppComponent.ngOnInit', {
      isReady: this.isReady,
      isAuthenticated: this.isAuthenticated,
      this: this,
    });
    this.service.checkStatus();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
