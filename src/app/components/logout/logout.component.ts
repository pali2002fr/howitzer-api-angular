import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { 
	AuthService, 
	SharedService,
	AlertService
} from '../../services/index';

@Component({
  	selector: 'app-logout',
  	templateUrl: './logout.component.html',
  	styleUrls: ['./logout.component.css']
})

export class LogoutComponent implements OnInit {
	public displaySettings: boolean;

  	constructor(  		
  		private router: Router,
  		private _authService: AuthService,
  		private _sharedService: SharedService,
  		private _alertService: AlertService
  	) { }

  	ngOnInit() {
  		this._authService.logout();
  		this._sharedService.changeDisplaySettings(false);
		this.router.navigate(['/login']);
  	}

}
