import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Angle } from '../models/index';

@Injectable()
export class AngleService {
	private _url: string = 'http://localhost:8888/howitzer-api-3/public/angles';
  	constructor(private http: HttpClient) { }

  	getAngles(): Observable<Angle[]>{
  		return this.http.get<Angle[]>(this._url);
  	}
}
