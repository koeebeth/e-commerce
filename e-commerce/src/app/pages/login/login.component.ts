import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import ButtonComponent from '../../shared/components/button/button.component';
import LoginFormComponent from './login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ButtonComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {}
