import { Component, OnInit } from '@angular/core';

import { 
  ResultService,
  SharedService
} from '../../services/index';

 import { 
  Trajectory
 } from '../../models/index';

@Component({
  	selector: 'app-shot-result',
  	templateUrl: './shot-result.component.html',
  	styleUrls: ['./shot-result.component.css']
})
export class ShotResultComponent implements OnInit {
	public trajectory: Trajectory;
	public shotId: number;
  public resultId: number;
	
  	constructor(
      private _resultService: ResultService,
      private _sharedService: SharedService
  	) { }

  	ngOnInit() { 
      this.getCurrentShotId();
      this.getTrajectory(this.shotId);
    }

    getCurrentShotId(){
      this._sharedService.currentShotId.subscribe(
        data => this.shotId = data,
        error => console.log(error),
        () => console.log(this.shotId)
      );
    }

    getTrajectory(shot_id: number): void {
      this._resultService.getTrajectory(shot_id).subscribe(
        data => this.trajectory = data,
        error => console.log(error),
        () => this.createResult(this.trajectory)
      );
    }

    createResult(trajectory: Trajectory): void {
      this._resultService.createResult(trajectory).subscribe(
        data => this.resultId = data,
        error => console.log(error),
        () => console.log(this.resultId)
      );
    }

    resetShotingForm(): void {
      this._sharedService.changeShotId(null);
    }
}
