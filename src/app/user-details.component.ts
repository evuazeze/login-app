import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import {IUser} from './user.model';

@Component({
  templateUrl: './user-details.component.html',
  styles: [`
    /*.container { padding-left: 20px; padding-right: 20px;}*/
  `]
})
export class UserDetailsComponent implements OnInit {
  user: IUser;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

}
