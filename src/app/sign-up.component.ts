import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {IUser} from './user.model';
import {PasswordValidator} from './password.validator';
import {TranslateService} from '@ngx-translate/core';

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
  gender: FormControl;
  phoneNumber: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  constructor(private authService: AuthService,
              private router: Router,
              public translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'zh']);
    translate.setDefaultLang('en');
    const  browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr|zh/) ? browserLang : 'en');
  }

  ngOnInit() {

    this.firstName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.otherName = new FormControl('', [Validators.pattern('[a-zA-Z].*')]);
    this.gender = new FormControl('', [Validators.required]);
    this.phoneNumber = new FormControl('', [Validators.required, Validators.pattern('[0-9].*')]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, PasswordValidator.mustBeValid]);
    this.confirmPassword = new FormControl('', [Validators.required]);

    this.signUpForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      otherName: this.otherName,
      gender: this.gender,
      phoneNumber: this.phoneNumber,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, this.checkPasswords);
  }

  signUpUser(formValues) {
    if (this.signUpForm.valid) {
      const user: IUser = {
        id: undefined,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        otherName: formValues.otherName,
        gender: formValues.gender,
        phoneNumber: formValues.phoneNumber,
        email: formValues.email,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword
      };
      this.authService.signUpUser(user);
      this.router.navigate(['user']);
    }
  }

  validate(control: AbstractControl) {
    return control.valid || control.untouched;
  }

  validateConfirmPassword() {
    return this.confirmPassword.touched && !!this.signUpForm.hasError('notSame');
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true };
  }
}
