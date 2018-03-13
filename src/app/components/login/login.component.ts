import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormsModule
} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {
  	AuthService,
  	SharedService,
  	AlertService
} from '../../services/index';

@Component({
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	error = '';
	displaySettings: boolean;
	loginForm: FormGroup;
  	username: FormControl;
  	password: FormControl;
	
	constructor(
	  	private router: Router,
	    private _authService: AuthService,
	    private _sharedService: SharedService,
	    private _alertService: AlertService
	) { }

	ngOnInit() {
	  	//reset login status
	    this._authService.logout();
	    this._sharedService.currentDisplaySettings.subscribe(
	        data => this.displaySettings = data,
	        error => console.log(error),
	        () => console.log(this.displaySettings)
	    );
	    this.createFormControls();
    	this.createForm();
    	this._sharedService.changeDisplaySettings(false);
	}

	createFormControls() {
	    this.username = new FormControl('', [
	      	Validators.required,
	      	Validators.minLength(4)
	    ]);
	    this.password = new FormControl('', [
	      	Validators.required,
	      	Validators.minLength(5),
	      	Validators.maxLength(8)
	    ]);
	}

	createForm(){
	    this.loginForm = new FormGroup({
	        username: this.username,
	        password: this.password
	    });
	}

	login() {
	    this._authService.login(this.loginForm.value.username, this.loginForm.value.password)
	        .subscribe(
	            data => {
                    // login successful
	                this.router.navigate(['/']);
	                this._sharedService.changeDisplaySettings(true);
                },
                error => {
                	this.loginForm.reset();
                    this._alertService.error(error);
                }
	    	);
	}

}
