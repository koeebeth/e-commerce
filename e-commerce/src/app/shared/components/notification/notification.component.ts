import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import NotificationService from '../../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export default class NotificationComponent {
  @Input() type: string = '';

  @Input() message: string = '';

  private subscription: Subscription;

  constructor(private notificationService: NotificationService) {
    this.subscription = this.notificationService.currentNotification.subscribe((notification) => {
      this.type = notification.type;
      this.message = notification.message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closeNotification() {
    this.notificationService.hideNotification();
  }
}
