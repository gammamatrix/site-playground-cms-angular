import { Component, OnInit } from '@angular/core';
import {
  Breakpoints,
  BreakpointState,
  BreakpointObserver,
} from '@angular/cdk/layout';
import { NumberInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(public breakpointObserver: BreakpointObserver) {}

  columns: NumberInput = 1;

  ngOnInit() {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.columns = 2;
        } else {
          this.columns = 1;
        }
      });
  }
}
