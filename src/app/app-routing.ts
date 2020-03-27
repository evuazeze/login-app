import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import {UserDetailsComponent} from './user-details.component';


export const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'user', component: UserDetailsComponent },
  { path: '', redirectTo: '/sign-up', pathMatch: 'full'}
];
