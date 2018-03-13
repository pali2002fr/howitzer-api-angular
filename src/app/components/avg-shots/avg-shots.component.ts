import { Component, OnInit } from '@angular/core';

import { 
	ShotService,
	SharedService
} from '../../services/index';

@Component({
	selector: 'app-avg-shots',
	templateUrl: './avg-shots.component.html',
	styleUrls: ['./avg-shots.component.css']
})
export class AvgShotsComponent implements OnInit {
  	public 	avgShots: number = 0;

	constructor( 
		private _shotService: ShotService,
		private _sharedService: SharedService
	) { }

	ngOnInit() {
		this.getAvgShots();
    	this.getCurrentAvgShots();
	}

	getAvgShots(): void {
	    this._shotService.getAvgShots().subscribe(
	      data => this.avgShots = data,
	      error => console.log(error),
	      () => console.log(this.avgShots)
	    );
	  }

	getCurrentAvgShots(){
	    this._sharedService.currentAvgShots.subscribe(
	      data => this.avgShots = data,
	      error => console.log(error),
	      () => console.log(this.avgShots)
	    );
	}
}
