import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';

import { routing } from './app.routes';

import {
  TotalShotsComponent,
  TotalUsersComponent,
  AvgShotsComponent,
  BestShottersComponent,
  ShotComponent,
  ShotFormComponent,
  TotalShotsByUserComponent,
  ShotResultComponent,
  LoginComponent,
  RegisterComponent,
  HomeComponent,
  ProfileComponent,
  HistoryComponent,
  SettingsComponent,
  AlertComponent,
  LogoutComponent
} from './components/index';

import { 
  AlertService,
  HowitzerService, 
  DistanceService,
  TargetService,
  SpeedService,
  AngleService,
  AuthService,
  AuthGuardService,
  UserService,
  ShotService,
  ResultService,
  SharedService
 } from './services/index';

@NgModule({
  declarations: [
    AppComponent,
    TotalShotsComponent,
    TotalUsersComponent,
    AvgShotsComponent,
    BestShottersComponent,
    ShotComponent,
    ShotFormComponent,
    TotalShotsByUserComponent,
    ShotResultComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    HistoryComponent,
    SettingsComponent,
    AlertComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('currentUser');
        },
        whitelistedDomains: ['localhost:8888']
      }
    })
  ],
  providers: [
    AlertService,
    HowitzerService, 
    DistanceService, 
    TargetService, 
    SpeedService, 
    AngleService,
    AuthService,
    AuthGuardService,
    UserService,
    ShotService,
    ResultService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
