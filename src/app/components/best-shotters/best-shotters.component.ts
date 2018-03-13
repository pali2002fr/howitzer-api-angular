import { Component, OnInit } from '@angular/core';
import { 
  ShotService,
  SharedService,
  AuthService
} from '../../services/index';

import { 
  Shotter
} from '../../models/index';

@Component({
  	selector: 'app-best-shotters',
  	templateUrl: './best-shotters.component.html',
  	styleUrls: ['./best-shotters.component.css']
})
export class BestShottersComponent implements OnInit {
	public limit = 5;
	public bestShotters: Shotter[] = [];
  public user_id: number;

	constructor( 
    private _shotService: ShotService,
    private _sharedService: SharedService,
    private _authService: AuthService
  ) { }

	ngOnInit() {
		this.getBestShotters();
    this.getCurrentBestShotters();
  }

  getBestShotters(): void {
    this._shotService.getBestShotters().subscribe(
      data => this.bestShotters = data,
      error => console.log(error),
      () => console.log(this.bestShotters)
    );
  }

  getCurrentBestShotters(){
    this._sharedService.currentBestShotters.subscribe(
      data => this.bestShotters = data,
      error => console.log(error),
      () => console.log(this.bestShotters)
    );
  }
}
