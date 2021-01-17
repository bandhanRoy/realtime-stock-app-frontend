import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { AccessDeniedComponent } from './public/access-denied/access-denied.component';
import { NotFoundComponent } from './public/not-found/not-found.component';
import { ChartsComponent } from './user/charts/charts.component';
import { TableComponent } from './user/table/table.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentModule } from './material-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouteGaurdService } from './services/route-gaurd.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AccessDeniedComponent,
    NotFoundComponent,
    ChartsComponent,
    TableComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    MaterialComponentModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    RouteGaurdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
