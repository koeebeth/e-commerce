import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import ButtonComponent from '../../shared/components/button/button.component';
import RegistrationFormComponent from './registration-form/registration-form.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ButtonComponent, RegistrationFormComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export default class RegistrationComponent {}
