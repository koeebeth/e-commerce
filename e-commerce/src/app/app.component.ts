import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import MainComponent from './pages/main/main.component';
import NotFoundComponent from './pages/not-found/not-found.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MainComponent, NotFoundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export default class AppComponent {
  title = 'e-commerce';
}
