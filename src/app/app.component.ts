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

  constructor(
    public breakpointObserver: BreakpointObserver,
    private service: AuthService
  ) {}

  public isReady = false;
  public isAuthenticated = false;

  ngOnInit() {
    this.isAuthenticated = this.service.isAuthenticated();
    this.isReady = true;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
