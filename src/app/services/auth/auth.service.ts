import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { 
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
	HttpResponse
} from '@angular/common/http';

import { } from '../../models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class AuthService {
    public _token: string;
    private _url: string = 'http://localhost:8888/howitzer-api-3/public';
 
    constructor(
    	private http: HttpClient,
    	private jwtHelperService: JwtHelperService
    ) {
        // set token if saved in local storage
        var token = localStorage.getItem('currentUser');
        if(token){
        	this._token = token;
        }
    }

    loggedIn() {
    	const token = this.jwtHelperService.tokenGetter();
	    if (!token) {
	      return false
	    }
	    console.log(this.jwtHelperService.decodeToken(token));
	    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);
	    return !tokenExpired
    }
 
    login(username: string, password: string): Observable<boolean> {
    	let body = JSON.stringify({ username: username, password: password });
        return this.http.post(this._url + '/login', body, httpOptions)
            .map((token: string) => {
            if(token){
            	this._token = token;

            	// store username and jwt token in local storage to keep user logged in between page refreshes
            	localStorage.setItem('currentUser', token);

            	// return true to indicate successful login
            	return true;
            } else {
            	// return false to indicate failed login
                return false;
            }
        });
    }

    getUserIdFromToken(): number {
    	let decodedToken = this.jwtHelperService.decodeToken(this._token);
    	return decodedToken.context.user.user_id;
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this._token = null;
        localStorage.removeItem('currentUser');
    }
}