import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { 
  User, 
  totalUsers
} from '../models/index';

@Injectable()
export class UserService {
	private _url: string = environment.apiEndpoint;
	
  constructor(
    private http: HttpClient
  ) { }

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this._url + '/users');
	}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this._url + '/users/' + id);
  }

  createUser(user: User): Observable<number> {
    return this.http.post<number>(this._url + '/register', user);
  }
 
  updateUser(user: User): Observable<boolean> {
    return this.http.put<boolean>(this._url + '/users/' + user.id, user);
  }

  updatePassword(oldpassword: string, user: User): Observable<boolean> {
    let body = {
      'newpassword': user.password,
      'oldpassword': oldpassword
    };
    return this.http.put<boolean>(this._url + '/users/' + user.id + '/update/password', body);
  }

  updateUsername(user: User): Observable<boolean> {
    return this.http.put<boolean>(this._url + '/users/' + user.id + '/update/username', user);
  }
 
  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this._url + '/users/' + id);
  }

	getTotalUsers(): Observable<totalUsers> {
		return this.http.get<totalUsers>(this._url + '/total-users');
	}

  userAlreadyExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(this._url + '/users/' + username + '/alreadyexists');
  }
}
