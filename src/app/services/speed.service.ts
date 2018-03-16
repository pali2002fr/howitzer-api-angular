import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Speed } from '../models/index';

@Injectable()
export class SpeedService {
	private _url: string = environment.apiEndpoint + '/speeds';
  	constructor(private http: HttpClient) { }

  	getSpeeds(): Observable<Speed[]>{
  		return this.http.get<Speed[]>(this._url);
  	}
}
