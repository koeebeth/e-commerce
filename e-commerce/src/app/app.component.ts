import { RouterLink, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import CommerceApiService from './shared/services/commercetoolsApi/commercetoolsapi.service';
import SharedModule from './shared/shared.module';
import NotificationComponent from './shared/components/notification/notification.component';
import HeaderComponent from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, SharedModule, HeaderComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export default class AppComponent {
  title = 'CyberVault';

  constructor(private commerceApiService: CommerceApiService) {}

  ngOnInit() {
    this.commerceApiService.checkTokens();
  }
}
