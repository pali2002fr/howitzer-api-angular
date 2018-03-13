import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { 
	SharedService 
} from '../../services/index';

@Component({
  	selector: 'app-settings',
  	templateUrl: './settings.component.html',
  	styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

	public displaySettings: boolean;

  	constructor(
  		private router: Router,
  		private _sharedService: SharedService 
	) { }

  	ngOnInit() {
  		this._sharedService.currentDisplaySettings.subscribe(
        data => this.displaySettings = data,
        error => console.log(error),
        () => console.log(this.displaySettings)
	    );

      if(localStorage.getItem('currentUser')){
        this._sharedService.changeDisplaySettings(true);
      } else {
        this._sharedService.changeDisplaySettings(false);
      }
  	}
}
