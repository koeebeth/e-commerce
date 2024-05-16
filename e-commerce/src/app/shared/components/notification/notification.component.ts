import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import NotificationService from '../../services/notification/notification.service';
import ButtonComponent from '../button/button.component';

const NOTIFICATION_TYPES = ['error', 'warning', 'success'];

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export default class NotificationComponent {
  @Input() type: string = '';

  @Input() message: string = '';

  isOpen: boolean = false;

  autoCloseTimer: number = 0;

  private subscription: Subscription;

  constructor(private notificationService: NotificationService) {
    this.subscription = this.notificationService.currentNotification.subscribe((notification) => {
      if (NOTIFICATION_TYPES.includes(notification.type.toLowerCase())) {
        this.type = notification.type;
        this.message = notification.message;
        this.isOpen = true;
        this.autoCloseTimer = window.setTimeout(() => {
          this.closeNotification();
        }, 5000);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closeNotification() {
    this.isOpen = false;
    clearTimeout(this.autoCloseTimer);
    this.autoCloseTimer = 0;
  }
}
