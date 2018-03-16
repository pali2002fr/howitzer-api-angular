import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Target } from '../models/index';

@Injectable()
export class TargetService {
	private _url: string = environment.apiEndpoint + '/targets';
  	constructor(private http: HttpClient) { }

  	getTargets(): Observable<Target[]>{
  		return this.http.get<Target[]>(this._url);
  	}
}
