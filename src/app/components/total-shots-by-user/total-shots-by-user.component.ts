import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { 
  ShotService, 
  UserService, 
  SharedService,
  AuthService
} from '../../services/index';

import { 
  User,
  totalShotsByUser
} from '../../models/index';

@Component({
  selector: 'app-total-shots-by-user',
  templateUrl: './total-shots-by-user.component.html',
  styleUrls: ['./total-shots-by-user.component.css']
})
export class TotalShotsByUserComponent implements OnInit {
  userId: number;
  user: User;
  totalShotsByUser: totalShotsByUser;

	constructor( 
    private _shotService: ShotService,
    private _userService: UserService,
    private _sharedService: SharedService,
    private _authService: AuthService
  ) { }

	ngOnInit() {
    this.userId = this._authService.getUserIdFromToken();
    this.getUser();
    this.getTotalShotsByUsers();
    this.getCurrentTotalShotsByUser();
  }

  getTotalShotsByUsers(): void {
    this._shotService.getTotalShotsByUser(this.userId).subscribe(
      data => this.totalShotsByUser = data,
      error => console.log(error),
      () => console.log(this.totalShotsByUser)
    );
  }

  getCurrentTotalShotsByUser(){
    this._sharedService.currentTotalShotsByUser.subscribe(
      data => this.totalShotsByUser = data,
      error => console.log(error),
      () => console.log(this.totalShotsByUser)
    );
  }

  getUser(): void {
    this._userService.getUser(this.userId).subscribe(
      data => this.user = data,
      error => console.log(),
      () => console.log(this.user)
    );
  }
}
