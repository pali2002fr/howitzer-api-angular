import { Component, OnInit } from '@angular/core';

import { 
  ResultService,
  AuthService
} from '../../services/index';

import { 
  Result
} from '../../models/index';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
	results: Result[];
  	constructor(
  		private _resultService: ResultService,
  		private _authService: AuthService
  	) { }

  	ngOnInit() {
  		this.getResults();
  	}
  	getResults(){
  		let userid = this._authService.getUserIdFromToken();
  		this._resultService.getResultsByUserId(userid).subscribe(
  			data => this.results = data,
  			error => console.log(error),
  			() => console.log(this.results)
  		);
  }
}
