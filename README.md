# RealtimeStockApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.25. This a simple real time stock app build on Angular 8.
The root is the login page once user logs he can see the dashboard. User can sign out, register. The user can see his history or search when scan button is clicked it will show the user the realtime chart for two minutes.The user can also view any chart from its history

## Installation

Please run `npm install -g @angular/cli@8.3.25` if you donot have angular 8 pre-installed.
Navigate to project folder and run `npm install` inside the project directory.

## Setup Instructions
For running this project add the backend url in `src/environments/environment.ts` and `src/environments/environment.prod.ts` for connecting to the backend properly and run the below mentioned commands.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Docker
Docker file is available in the root `Dockerfile`.

###### Commands to build docker
> docker build -t your app name:version  -f Dockerfile .

###### Commands to run docker
1. Without shell
> docker run -d -p 80:80 your app name:version
2. With the shell
> docker run -it -p 80:80 your app name:version
