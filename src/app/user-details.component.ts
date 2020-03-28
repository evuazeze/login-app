import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import {IUser} from './user.model';

@Component({
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
  user: IUser;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

}
