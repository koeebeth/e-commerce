import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import MainComponent from './pages/main/main.component';
import RegistrationComponent from './pages/registration/registration.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, RegistrationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export default class AppComponent {
  title = 'e-commerce';
}
