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
  AlertService
} from '../../services/index';

@Component({
  	selector: 'app-register',
  	templateUrl: './register.component.html',
  	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	model: any = {};
  registerForm: FormGroup;
  firstname: FormControl;
  lastname: FormControl;
  username: FormControl;
  password: FormControl;

	constructor(
		private router: Router,
    private _userService: UserService,
    private _alertService: AlertService
	) { }

	ngOnInit() {
    this.createFormControls();
    this.createForm();
	}

  validateUsernameNotTaken(control: AbstractControl) {
    return this._userService.userAlreadyExists(control.value).pipe(
      map(data => data ? {'alreadyexists': true} :  null)
    );
  }

  createFormControls() {
    this.firstname = new FormControl('', Validators.required);
    this.lastname = new FormControl('', Validators.required);
    this.username = new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ],
      this.validateUsernameNotTaken.bind(this)
    );
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(8)
    ]);
  }

  createForm(){
    this.registerForm = new FormGroup({
      fullname: new FormGroup({
        firstname: this.firstname,
        lastname: this.lastname
      }),
      credentials: new FormGroup({
        username: this.username,
        password: this.password
      })
    });
  }

	register(){		
    let _user = {
      'id': 0,
      'firstname': this.registerForm.value.fullname.firstname,
      'lastname': this.registerForm.value.fullname.lastname,
      'username': this.registerForm.value.credentials.username,
      'password': this.registerForm.value.credentials.password
    };

		this._userService.createUser(_user).subscribe(
      data => {
          // set success message and pass true paramater to persist the message after redirecting to the login page
          this._alertService.success('User successfully registered', true);
          this.router.navigate(['/login']);
      },
      error => {
          this._alertService.error(error);
      }
    );
	}
}
