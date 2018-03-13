import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

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
  LogoutComponent
} from './components/index';

import { 
  	AuthGuardService as AuthGuard 
} from './services/index';

const routes: Routes = [
	{
  		path: 'login', 
  		component: LoginComponent
  	},
  	{
  		path: 'register', 
  		component: RegisterComponent
  	},
  	{ 
  		path: '', 
  		component: HomeComponent,
  		canActivate: [AuthGuard]
  	},

  	{ 
    	path: 'profile',
    	component: ProfileComponent,
    	canActivate: [AuthGuard] 
  	},
  	{
  		path: 'history',
    	component: HistoryComponent,
    	canActivate: [AuthGuard] 
  	},
    {
      path: 'logout',
      component: LogoutComponent,
      canActivate: [AuthGuard] 
    },
  	{ 
      path: '**', 
  		redirectTo: '' 
  	}
];

export const routing = RouterModule.forRoot(routes);
