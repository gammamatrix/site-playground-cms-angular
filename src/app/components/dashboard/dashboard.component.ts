import { Component, OnInit } from '@angular/core';
import {
  Breakpoints,
  BreakpointState,
  BreakpointObserver,
} from '@angular/cdk/layout';
import { NumberInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public breakpointObserver: BreakpointObserver) {}

  columns: NumberInput = 1;

  ngOnInit() {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.columns = 2;
          console.log('Viewport matches Breakpoints.Handset');
        } else {
          this.columns = 1;
          console.log('Viewport does not match Breakpoints.Handset');
        }
      });
  }
}
