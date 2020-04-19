# NgStats

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

## Using npx

No globals use `npx`

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `npx ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io) in headless Chrome.
Run `npm run test-watch` to execute the unit tests via in watch mode Chrome.

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## App architecture

This project was architected using this [article](https://medium.com/@tomastrajan/how-to-build-epic-angular-app-with-clean-architecture-91640ed1656).

- App module
- Core module
- Shared module
- Lazy loaded features

Build steps:

1. Create a workspace for ng-stats apps

npx -p @angular/cli ng new ng-stats --create-application false --strict

2. Create covid19-stats-app application (set components name prefix to "cvd", use scss and routing)

cd ng-stats
npx ng g application covid19-stats-app --prefix cvd --style scss --routing

** add initial scaffolding for workspace and project **

3. Add angular material

npx ng add @angular/material

4. Add custom themes

cd projects/covid19-stats-app/src
mkdir themes && cd "$_"
touch default-theme.scss
touch light-theme.scss
touch dark-theme.scss

5. Add npx to package json scripts

** add angular material and custom themes **

6. Add webpack bundle analyzer

npm i -D webpack-bundle-analyzer

** add webpack bundle analyzer **

7. Clean up app.component and add core module

npx ng g m core

** add core module **

8. Add core layout

npx ng g c core/layout/main-layout

** add main layout core component **

9. Add app tob toolbar and router outlet

** add app tob toolbar and router outlet **

10. Add dashboard feature and app routing (lazy feature)

npx ng g m features/dashboard --route dashboard --module app.module.ts

** add dashboard feature and app routing **

11. Add about feature (lazy feature)

npx ng g m features/about --route about --module app.module.ts

** add about feature and route **

12. Add simple app navigation

** add simple app navigation **

13. Add shared module

npx ng g m shared

** add shared module **

14. Add flex layout

npm i -s @angular/flex-layout

** add flex layout **
