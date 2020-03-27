import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {IUser} from './user.model';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should save a new user', () => {
    let user: IUser;

    user = {
      id: undefined,
      firstName: 'Emmanuel',
      lastName: 'Evuazeze',
      otherName: 'Oghenewegba',
      phoneNumber: '08032774668',
      email: 'eevuazeze@byteworks.ng.com',
      password: '12Wegba34@%',
      confirmPassword: '12Wegba34@%'
    };

    const savedUser: IUser = service.signUpUser(user);

    expect(savedUser.firstName).toBe(user.firstName);
    expect(savedUser.lastName).toBe(user.lastName);
    expect(savedUser.otherName).toBe(user.otherName);
    expect(savedUser.email).toBe(user.email);
  });

  it('should return the current user', () => {
    let user: IUser;

    user = {
      id: undefined,
      firstName: 'Emmanuel',
      lastName: 'Evuazeze',
      otherName: 'Oghenewegba',
      phoneNumber: '08032774668',
      email: 'eevuazeze@byteworks.ng.com',
      password: '12Wegba34@%',
      confirmPassword: '12Wegba34@%'
    };

    service.signUpUser(user);
    const currentUser: IUser = service.getCurrentUser();

    expect(currentUser.firstName).toBe(user.firstName);
    expect(currentUser.lastName).toBe(user.lastName);
    expect(currentUser.otherName).toBe(user.otherName);
    expect(currentUser.email).toBe(user.email);
  });
});
