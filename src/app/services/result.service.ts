import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Shot, Trajectory, Result } from '../models/index';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ResultService {
	private _url: string = 'http://localhost:8888/howitzer-api-3/public';

	constructor(private http: HttpClient) { }

	getTrajectory(shot_id: number): Observable<Trajectory>{
	    return this.http.get<Trajectory>(this._url + '/calculate-trajectoire/' + shot_id);
	}

	createResult(trajectory: Trajectory): Observable<number>{
		let body = JSON.stringify(trajectory);
		return this.http.post<number>(this._url + '/results', body, httpOptions);
	}

	getResultsByUserId(user_id: number): Observable<Result[]> {
		return this.http.get<Result[]>(this._url + '/users/' + user_id + '/results/desc');
	}
}
