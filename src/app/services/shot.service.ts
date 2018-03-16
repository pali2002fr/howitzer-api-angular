import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { 
	Shotter, 
	Shot, 
	Trajectory,
  	totalShots,
  	avgShots,
  	totalShotsByUser
} from '../models/index';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ShotService {
	private _limit = 5;
	private _url: string = environment.apiEndpoint;

	constructor(private http: HttpClient) { }

	getBestShotters(): Observable<Shotter[]>{
		return this.http.get<Shotter[]>(this._url + '/top/' + this._limit);
	}

	getTotalShotsByUser(user_id: number): Observable<totalShotsByUser>{
		return this.http.get<totalShotsByUser>(this._url + '/total-shots-by-user/' + user_id);
	}

	getTotalShots (): Observable<totalShots> {
	    return this.http.get<totalShots>(this._url + '/total-shots');
	}

	getAvgShots(): Observable<avgShots>{
		return this.http.get<avgShots>(this._url + '/avg-shots');
	}

	createShot(shot: Shot): Observable<number>{
		let body = JSON.stringify(shot);
		return this.http.post<number>(this._url + '/shots', body, httpOptions);
	}
}
