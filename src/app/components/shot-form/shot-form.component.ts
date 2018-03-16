import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormsModule
} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { 
  Shot,
  Shotter,
  totalUsers,
  totalShots,
  avgShots,
  totalShotsByUser
 } from '../../models/index';

import { 
  UserService, 
  HowitzerService, 
  DistanceService,
  TargetService,
  SpeedService,
  AngleService,
  ShotService,
  ResultService,
  SharedService,
  AuthService
 } from '../../services/index';

@Component({
  	selector: 'app-shot-form',
  	templateUrl: './shot-form.component.html',
  	styleUrls: ['./shot-form.component.css']
})

export class ShotFormComponent implements OnInit {
  	public  howitzers = [];
  	public  distances = [];
  	public  targets = []; 
  	public  speeds = []; 
  	public  angles = []; 
    public  selectedHowitzer;
    public  selectedDistance;
    public  selectedTarget; 
    public  selectedSpeed;
    public  selectedAngle;
    public  shotId: number;
    public  result;
    public  resultID: number;
    public  totalShotsByUser: totalShotsByUser;
    public  totalShots: totalShots;
    public  totalUsers: totalUsers;
    public  avgShots: avgShots;
    public  bestShotters: Shotter[];
    public  userId: number;
    public  refreshTotalShotsByUser: totalShotsByUser;
    public  refreshTotalShots: totalShots;
    public  refreshTotalUsers: totalUsers;
    public  refreshAvgShots: avgShots;
    public  refreshBestShotters: Shotter[];

    shotForm: FormGroup;
    weight: FormControl;
    distance: FormControl;
    target: FormControl;
    speed: FormControl;
    angle: FormControl;

  	constructor(
      private _userService: UserService,
  		private _howitzerService: HowitzerService, 
  		private _distanceService: DistanceService,
  		private _targetService: TargetService,
  		private _speedService: SpeedService,
  		private _angleService: AngleService,
      private _shotService: ShotService,
      private _resultService: ResultService,
      private _sharedService: SharedService,
      private _authService: AuthService
  	) { }

  	ngOnInit() {
      this._howitzerService.getHowitzers().subscribe(data => this.howitzers = data);
      this._distanceService.getDistances().subscribe(data => this.distances = data);
  		this._targetService.getTargets().subscribe(data => this.targets = data);
  		this._speedService.getSpeeds().subscribe(data => this.speeds = data);
  		this._angleService.getAngles().subscribe(data => this.angles = data);
      this.userId = this._authService.getUserIdFromToken();
      
      this._sharedService.currentTotalShotsByUser.subscribe(
        data => this.totalShotsByUser = data,
        error => console.log(error),
        () => console.log(this.totalShotsByUser)
      );

      this._sharedService.currentTotalShots.subscribe(
        data => this.totalShots = data,
        error => console.log(error),
        () => console.log(this.totalShots)
      );

      this._sharedService.currentAvgShots.subscribe(
        data => this.avgShots = data,
        error => console.log(error),
        () => console.log(this.avgShots)
      );   

      this._sharedService.currentShotId.subscribe(
        data => this.shotId = data,
        error => console.log(error),
        () => console.log(this.shotId)
      );  

      this.createFormControls();
      this.createForm();
  	}

    createFormControls() {
      this.weight = new FormControl('', Validators.required);
      this.distance = new FormControl('', Validators.required);
      this.target = new FormControl('', Validators.required);
      this.speed = new FormControl('', Validators.required);
      this.angle = new FormControl('', Validators.required);
    }

    createForm(){
      this.shotForm = new FormGroup({
          weight: this.weight,
          distance: this.distance,
          target: this.target,
          speed: this.speed,
          angle: this.angle
      });
    }

    shot(): void {
      let shot = {
        angle_id: this.shotForm.value.angle,
        howitzer_id: this.shotForm.value.weight,
        target_id: this.shotForm.value.target,
        distance_id: this.shotForm.value.distance,
        speed_id: this.shotForm.value.speed,
        user_id: this.userId
      };  
      this.createShot(shot);                      
    }

    getRefreshTotalShots(): void {
      const that = this;
      this._shotService.getTotalShots()
        .subscribe(
          data => that.refreshTotalShots = data,
          error => console.log(error),
          () => this.updateTotalShots(this.refreshTotalShots)
      );
    }

    getRefreshTotalUsers(): void {
      const that = this;
      this._userService.getTotalUsers()
        .subscribe(
          data => that.refreshTotalUsers = data,
          error => console.log(error),
          () => this.updateTotalUsers(this.refreshTotalUsers)
      );
    }

    getRefreshTotalShotsByUser(): void {
      const that = this;
      this._shotService.getTotalShotsByUser(this.userId)
        .subscribe(
          data => that.refreshTotalShotsByUser = data,
          error => console.log(error),
          () => this.updateTotalShotsByUser(this.refreshTotalShotsByUser)
      );
    }

    getRefreshAvgShots(): void {
      const that = this;
      this._shotService.getAvgShots()
        .subscribe(
          data => that.refreshAvgShots = data,
          error => console.log(error),
          () => this.updateAvgShots(this.refreshAvgShots)
      );
    }

    getRefreshBestShotters(): void {
      const that = this;
      this._shotService.getBestShotters()
        .subscribe(
          data => that.refreshBestShotters = data,
          error => console.log(error),
          () => this.updateBestShotters(this.refreshBestShotters)
      );
    }

    updateAvgShots(avg: avgShots): void {
      this._sharedService.changeAvgShots(avg);
    }

    updateTotalShotsByUser(total: totalShotsByUser): void {
      this._sharedService.changeTotalShotsByUser(total);
    }

    updateTotalShots(total: totalShots): void {
      this._sharedService.changeTotalShots(total);
    }

    updateTotalUsers(total: totalUsers): void {
      this._sharedService.changeTotalUsers(total);
    }

    updateBestShotters(bestShotters: Shotter[]): void {
      this._sharedService.changeBestShotters(bestShotters);
    }

    updateShotId(shotId: number): void {
      this._sharedService.changeShotId(shotId);
    }

    createShot(shot: Shot): void {
      this._shotService.createShot(shot).subscribe(
        data => this.shotId = data,
        error => console.log(error),
        () => {
          this.updateShotId(this.shotId);
          this.getRefreshTotalShotsByUser();
          this.getRefreshTotalShots();
          this.getRefreshTotalUsers();
          this.getRefreshAvgShots();
          this.getRefreshBestShotters();
        }
      );
    }
}
