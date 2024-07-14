# Site: Playground Cms UI with Angular

[![Playground CI Workflow](https://github.com/gammamatrix/site-playground-cms-angular/actions/workflows/playwright.yml/badge.svg?branch=develop)](.github/workflows/playwright.yml)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

```sh
nvm list
```

```
       v16.20.2
       v20.11.1
->     v20.15.1
```

```sh
npx -p @angular/cli@16.2.0 ng new site-playground-cms-angular
npx -p @angular/cli@16.2.0 ng new site-playground-cms-angular
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

To execute the end-to-end tests via a Playwright, run:

```sh
ng e2e
```

See test reports with:

```sh
npm run report
```

## Dev Notes

### installation

ng new site-playground-cms-angular

npm init playwright@latest

ng add @angular/cdk@16.2.0

ng add @angular/material@16.2.0

npm install prettier --save-dev

npx prettier --write .

ng add @angular-eslint/schematics

npm install prettier-eslint eslint-config-prettier eslint-plugin-prettier --save-dev

### layout

set up theme

### tests

Import to src/app/app.component.spec.ts

```ts
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
```

```ts
describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, RouterTestingModule, MatListModule, MatSidenavModule, MatToolbarModule],
      declarations: [AppComponent, NavigationComponent],
    }),
  );
```

### Components

ng generate @angular/material:dashboard components/dashboard
ng generate @angular/material:dashboard components/pages

ng generate @angular/material:navigation components/navigation
ng generate component components/footer
