import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {IUser} from './user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: [`
    em { float: right; color: #E05C65; padding-left: 10px; }
  `]
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  otherName: FormControl;
  phoneNumber: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {

    this.firstName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.otherName = new FormControl('', [Validators.pattern('[a-zA-Z].*')]);
    this.phoneNumber = new FormControl('', [Validators.required, Validators.pattern('[0-9].*')]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, this.mustBeValid]);
    this.confirmPassword = new FormControl('', [Validators.required, this.mustBeValid]);

    this.signUpForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      otherName: this.otherName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  signUpUser(formValues) {
    if (this.signUpForm.valid) {
      const user: IUser = {
        id: undefined,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        otherName: formValues.otherName,
        phoneNumber: formValues.phoneNumber,
        email: formValues.email,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword
      };
      this.authService.signUpUser(user);
      this.router.navigate(['user']);
    }
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched;
  }

  validateLastName() {
    return this.lastName.valid || this.lastName.untouched;
  }

  validateOtherName() {
    return this.otherName.valid || this.otherName.untouched;
  }

  validatePhoneNumber() {
    return this.phoneNumber.valid || this.phoneNumber.untouched;
  }

  validateEmail() {
    return this.email.valid || this.email.untouched;
  }

  mustBeValid(control: FormControl): ValidationErrors | null {
    const value = control.value as string;

    if (value.length < 8) { return {invalidLength: true}; }

    if (!(/[a-z]/.test(value))) { return {noLowerCase: true}; }

    if (!(/[A-Z]/.test(value))) { return {noUpperCase: true}; }

    if (!(/[0-9]/.test(value))) { return {noNumber: true}; }

    if (!(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value))) { return {noSymbol: true}; }

    return null;
  }

  validatePassword() {
    return this.password.valid || this.password.untouched;
  }

  validateConfirmPassword() {
    return this.confirmPassword.valid || this.confirmPassword.untouched;
  }
}
