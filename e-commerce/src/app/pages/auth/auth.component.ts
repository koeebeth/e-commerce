import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import RegistrationComponent from '../registration/registration.component';
import LoginComponent from '../login/login.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RegistrationComponent, LoginComponent, NgIf],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export default class AuthComponent {
  currentComponent: 'login' | 'registration' = 'login';

  switchToLogin() {
    this.currentComponent = 'login';
  }

  switchToRegistration() {
    this.currentComponent = 'registration';
  }
}
