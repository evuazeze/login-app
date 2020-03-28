import { Injectable } from '@angular/core';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: IUser;
  public signUpUser(user: IUser): IUser
  {
    return this.currentUser = {
      id: 1,
      firstName: user.firstName,
      lastName: user.lastName,
      otherName: user.otherName,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword
    };
  }

  public getCurrentUser(): IUser {
    return this.currentUser;
  }

}
