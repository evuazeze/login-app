import { Injectable } from '@angular/core';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: IUser;
  public signUpUser(
    firstName: string,
    lastName: string,
    otherName: string,
    phoneNumber: string,
    email: string,
    password: string,
    confirmPassword: string)
  {
    this.currentUser = {
      firstName,
      lastName,
      otherName,
      phoneNumber,
      email,
      password,
      confirmPassword
    };
  }

  public getCurrentUser() {
    return this.currentUser;
  }

}
