import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import ButtonComponent from '../../shared/components/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {}
