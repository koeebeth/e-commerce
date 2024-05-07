import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import MainComponent from './pages/main/main.component';
import RegistrationComponent from './pages/registration/registration.component';
import LoginComponent from './pages/login/login.component';
import NotFoundComponent from './pages/not-found/not-found.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, RegistrationComponent, LoginComponent, NotFoundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export default class AppComponent {
  title = 'e-commerce';
}
