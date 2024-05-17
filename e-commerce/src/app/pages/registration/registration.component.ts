import { Component } from '@angular/core';
import RegistrationFormComponent from './registration-form/registration-form.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RegistrationFormComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export default class RegistrationComponent {}
