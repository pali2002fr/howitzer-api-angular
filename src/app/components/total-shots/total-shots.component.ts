import { Component, OnInit } from '@angular/core';

import { 
  ShotService, 
  SharedService 
} from '../../services/index';

import { } from '../../models/index';

@Component({
  	selector: 'app-total-shots',
  	templateUrl: './total-shots.component.html',
  	styleUrls: ['./total-shots.component.css']
})
export class TotalShotsComponent implements OnInit {
    totalShots: number;

  	constructor( 
      private _shotService: ShotService, 
      private _sharedService: SharedService 
    ) { }

  	ngOnInit() {
      this.getTotalShots();
      this.getCurrentTotalShots();
  	}

    getTotalShots(): void {
      this._shotService.getTotalShots().subscribe( 
        res => this.totalShots = res,
        error => console.log(error),
        () => console.log(this.totalShots)
      );
    }

    getCurrentTotalShots(){
      this._sharedService.currentTotalShots.subscribe(
        data => this.totalShots = data,
        error => console.log(error),
        () => console.log(this.totalShots)
      );
    }
}
