import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Howitzer } from '../models/index';

@Injectable()
export class HowitzerService {
	private _url: string = 'http://localhost:8888/howitzer-api-3/public/howitzers';
  	constructor(private http: HttpClient) { }

  	getHowitzers(): Observable<Howitzer[]>{
  		return this.http.get<Howitzer[]>(this._url);
  	}
}
