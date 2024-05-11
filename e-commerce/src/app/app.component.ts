import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AuthService from './shared/services/commercetoolsApi/commercetoolsapi.service';
import SharedModule from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export default class AppComponent {
  title = 'e-commerce';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.refreshAccessToken();
  }
}
