import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Distance } from '../models/index';

@Injectable()
export class DistanceService {
	private _url: string = environment.apiEndpoint + '/distances';
  	constructor(private http: HttpClient) { }

  	getDistances(): Observable<Distance[]>{
  		return this.http.get<Distance[]>(this._url);
  	}
}
