import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormsModule,
  AbstractControl
} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { map } from 'rxjs/operators';

import { 
	UserService,
  	AlertService,
  	AuthService
} from '../../services/index';

import { 
	User
} from '../../models/index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
	user: User;
	_user_id: number;

	fullnameForm: FormGroup;
	firstname: FormControl;
	lastname: FormControl;

	usernameForm: FormGroup;
	username: FormControl;

	passwordForm: FormGroup; 
	oldpassword: FormControl;
	newpassword: FormControl;

	deleteaccountForm: FormGroup;
	iagree: FormControl;

  	constructor(
  		private router: Router,
  		private _userService: UserService,
  		private _alertService: AlertService,
  		private _authService: AuthService
  	) { }

  	ngOnInit() {
  		this._user_id = this._authService.getUserIdFromToken();

  		this.createFormControlsFullname();
  		this.createFormFullname();
  		this.createFormControlsUsername();
  		this.createFormUsername();
  		this.createFormControlsPassword();
  		this.createFormPassword();
  		this.createFormControlsDeleteAccount();
  		this.createFormDeleteAccount();

  		this._userService.getUser(this._user_id).subscribe(
  			data => {this.user = data},
  			err => console.log(err),
  			() => {
  				this.firstname.setValue(this.user.firstname);
  				this.lastname.setValue(this.user.lastname);
  				this.username.setValue(this.user.username);
  			}
  		);
  	}

  	validateUsernameNotTaken(control: AbstractControl) {
		return this._userService.userAlreadyExists(control.value).pipe(
	      	map(data => data ? {'alreadyexists': true} :  null)
	    );
  	}

    createFormControlsFullname() {
    	this.firstname = new FormControl('', Validators.required);
    	this.lastname = new FormControl('', Validators.required);
  	}

  	createFormFullname(){
    	this.fullnameForm = new FormGroup({
	      	fullname: new FormGroup({
	        	firstname: this.firstname,
	        	lastname: this.lastname
	      	})
	    });
  	}

  	createFormControlsUsername() {
    	this.username = new FormControl('', [
        		Validators.required,
        		Validators.minLength(4),
      		],
      		this.validateUsernameNotTaken.bind(this)
    	);
  	}

  	createFormUsername(){
    	this.usernameForm = new FormGroup({
	      	username: new FormGroup({
	        	username: this.username
	      	})
	    });
	}   

	createFormControlsPassword() {
	    this.oldpassword = new FormControl('', [
	      	Validators.required,
	      	Validators.minLength(5),
	      	Validators.maxLength(8)
	    ]);
	    this.newpassword = new FormControl('', [
	      	Validators.required,
	      	Validators.minLength(5),
	      	Validators.maxLength(8)
	    ]);
  	}

  	createFormPassword(){
    	this.passwordForm = new FormGroup({
	      	password: new FormGroup({
	        	oldpassword: this.oldpassword,
	        	newpassword: this.newpassword
	      	})
	    });
  	}

  	createFormControlsDeleteAccount() {
	    this.iagree = new FormControl(false, Validators.required);
  	}

  	createFormDeleteAccount(){
    	this.deleteaccountForm = new FormGroup({
    		deleteaccount: new FormGroup({
	        	iagree: this.iagree
	        })
	    });
  	}

  	updateFullname(){
  		let userToUpdate = this.user;
  		let firstnameToUpdate = this.fullnameForm.value.fullname.firstname;
  		let lastnameToUpdate = this.fullnameForm.value.fullname.lastname;
  		let saveIt = false;

  		if(userToUpdate.firstname != firstnameToUpdate){
  			userToUpdate.firstname = firstnameToUpdate;
  			saveIt = true;
  		}
  		if(userToUpdate.lastname != lastnameToUpdate){
  			userToUpdate.lastname = lastnameToUpdate;
  			saveIt = true;
  		}
  		if(saveIt){
  			this._userService.updateUser(userToUpdate).subscribe(
	  			data => {
	          		this._alertService.success('User successfully updated', true);
	      		},
			    error => {
			        this._alertService.error(error);
			    }
	  		);
  		}
  	}

  	updateUsername(){
  		let userToUpdate = this.user;
  		let usernameToUpdate = this.usernameForm.value.username.username;

  		if(usernameToUpdate != userToUpdate.username){
  			userToUpdate.username = usernameToUpdate;
  			this._userService.updateUsername(userToUpdate).subscribe(
	  			data => {
	          		this._alertService.success('Username successfully updated', true);
	          		this.router.navigate(['/login']);
	      		},
			    error => {
			        this._alertService.error(error);
			    }
	  		);
  		}
  	}

  	updatePassword(){
  		let userToUpdate = this.user;
  		let oldpasswordToUpdate = this.passwordForm.value.password.oldpassword;
  		let newpasswordToUpdate = this.passwordForm.value.password.newpassword;

  		if(oldpasswordToUpdate !== newpasswordToUpdate){
  			userToUpdate.password = newpasswordToUpdate;
  			this._userService.updatePassword(oldpasswordToUpdate, userToUpdate).subscribe(
	  			data => {
	          		this._alertService.success('Password successfully updated', true);
	          		this.router.navigate(['/login']);
	      		},
			    error => {
			    	this.passwordForm.reset();
			        this._alertService.error(error);
			    }
	  		);
  		}
  	}

  	deleteAccount(){
  		let iAgree = this.deleteaccountForm.value.deleteaccount.iagree
  		if(iAgree){
  			this._userService.deleteUser(this.user.id).subscribe(
	  			data => {
	          		this._alertService.success('User successfully deleted', true);
	          		this.router.navigate(['/login']);
	      		},
			    error => {
			        this._alertService.error(error);
			    }
	  		);
  		}
  	}
	   
}
