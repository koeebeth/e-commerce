import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import ButtonComponent from '../../shared/components/button/button.component';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ButtonComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export default class RegistrationComponent {}
