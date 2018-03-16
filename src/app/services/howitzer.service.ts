import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Howitzer } from '../models/index';

@Injectable()
export class HowitzerService {
	private _url: string = environment.apiEndpoint + '/howitzers';
  	constructor(private http: HttpClient) { }

  	getHowitzers(): Observable<Howitzer[]>{
  		return this.http.get<Howitzer[]>(this._url);
  	}
}
