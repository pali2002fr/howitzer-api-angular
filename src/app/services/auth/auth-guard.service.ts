import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  	constructor(
  		private _authService: AuthService,
  		public router: Router
  	) { }

  	canActivate(){
  		if (this._authService.loggedIn()) {
	      	return true;
	    }  else {
	      	localStorage.removeItem('currentUser');
	      	this.router.navigate(['/login']);
	      	return false;
	    }
  	}
}
