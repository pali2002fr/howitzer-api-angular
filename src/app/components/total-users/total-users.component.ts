import { Component, OnInit } from '@angular/core';

import { 
  UserService,
  SharedService
} from '../../services/index';

import { totalUsers } from '../../models/index';

@Component({
  selector: 'app-total-users',
  templateUrl: './total-users.component.html',
  styleUrls: ['./total-users.component.css']
})
export class TotalUsersComponent implements OnInit {
	totalUsers: totalUsers;

	constructor( 
    private _userService: UserService,
    private _sharedService: SharedService
  ) { }

	ngOnInit() {
		this.getTotalUsers();
    this.getCurrentTotalUsers();
	}

  getTotalUsers(): void {
    this._userService.getTotalUsers().subscribe(
      data => this.totalUsers = data,
      error => console.log(error),
      () => console.log(this.totalUsers)
    );
  }

  getCurrentTotalUsers(){
    this._sharedService.currentTotalUsers.subscribe(
      data => this.totalUsers = data,
      error => console.log(error),
      () => console.log(this.totalUsers)
    );
  }
}
