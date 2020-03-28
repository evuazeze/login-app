import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {AuthService} from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {routes} from './app-routing';
import {DebugElement} from '@angular/core';
import {IUser} from './user.model';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let element: HTMLElement;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterModule.forRoot(routes)
      ],
      declarations: [ SignUpComponent ],
      providers: [ AuthService ],
      schemas: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;

    fixture.detectChanges();
  });

  it ('Sign up form should be defined', () => {
      expect(component).toBeDefined();
    });

  it ('Sign up form should be valid', () => {
    const firstName = component.signUpForm.controls.firstName;
    firstName.setValue('Emmanuel');
    const lastName = component.signUpForm.controls.lastName;
    lastName.setValue('Evuazeze');
    const otherName = component.signUpForm.controls.otherName;
    otherName.setValue('Oghenewegba');
    const phoneNumber = component.signUpForm.controls.phoneNumber;
    phoneNumber.setValue('08032774668');
    const email = component.signUpForm.controls.email;
    email.setValue('evuazeze.emmanuel@gmail.com');
    const password = component.signUpForm.controls.password;
    password.setValue('12Wegba34@%');
    const confirmPassword = component.signUpForm.controls.confirmPassword;
    confirmPassword.setValue('12Wegba34@%');

    expect(component.signUpForm.valid).toBeTruthy();
  });

  it ('Sign up form should be invalid when password length is less than 8', () => {
    const firstName = component.signUpForm.controls.firstName;
    firstName.setValue('Emmanuel');
    const lastName = component.signUpForm.controls.lastName;
    lastName.setValue('Evuazeze');
    const otherName = component.signUpForm.controls.otherName;
    otherName.setValue('Oghenewegba');
    const phoneNumber = component.signUpForm.controls.phoneNumber;
    phoneNumber.setValue('08032774668');
    const email = component.signUpForm.controls.email;
    email.setValue('evuazeze.emmanuel@gmail.com');
    const password = component.signUpForm.controls.password;
    password.setValue('12W34@%');
    const confirmPassword = component.signUpForm.controls.confirmPassword;
    confirmPassword.setValue('12W34@%');

    expect(component.signUpForm.valid).toBeFalsy();
    expect(component.signUpForm.controls.password.valid).toBeFalsy();
    expect(password.errors.invalidLength).toBeTruthy();
  });

  it ('New user should be able to sign up', () => {
    inject([AuthService], (service: AuthService) => {
      const firstName = component.signUpForm.controls.firstName;
      firstName.setValue('Emmanuel');
      const lastName = component.signUpForm.controls.lastName;
      lastName.setValue('Evuazeze');
      const otherName = component.signUpForm.controls.otherName;
      otherName.setValue('Oghenewegba');
      const phoneNumber = component.signUpForm.controls.phoneNumber;
      phoneNumber.setValue('08032774668');
      const email = component.signUpForm.controls.email;
      email.setValue('evuazeze.emmanuel@gmail.com');
      const password = component.signUpForm.controls.password;
      password.setValue('12Wegba34@%');
      const confirmPassword = component.signUpForm.controls.confirmPassword;
      confirmPassword.setValue('12Wegba34@%');

      const user: IUser = {
        id: undefined,
        firstName: firstName.value,
        lastName: lastName.value,
        otherName: otherName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
      };

      component.signUpUser(user);
      const signedUpUser: IUser = service.getCurrentUser();

      expect(component.signUpForm.valid).toBeTruthy();
      expect(signedUpUser.firstName).toEqual(firstName.value);
      expect(signedUpUser.lastName).toEqual(lastName.value);
      expect(signedUpUser.email).toEqual(email.value);
    });
  });
});
