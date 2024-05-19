import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import CommerceApiService from './shared/services/commercetoolsApi/commercetoolsapi.service';
import SharedModule from './shared/shared.module';
import NotificationComponent from './shared/components/notification/notification.component';
import { NotificationService } from './shared/services/notification/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, SharedModule, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export default class AppComponent {
  title = 'e-commerce';

  constructor(
    private commerceApiService: CommerceApiService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.commerceApiService.checkTokens();
    // usage example:
    this.notificationService.showNotification('warning', 'Warning text');
    this.notificationService.showNotification('error', 'Error text');
    this.notificationService.showNotification('success', 'Success text');
  }
}
