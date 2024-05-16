import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class NotificationService {
  private notificationsQueue: { type: string; message: string }[] = [];

  private isShowNextNotification = false;

  private notificationSource = new BehaviorSubject<{ type: string; message: string }>({ type: '', message: '' });

  currentNotification = this.notificationSource.asObservable();

  showNotification(type: string, message: string) {
    const notification: { type: string; message: string } = { type, message };
    this.notificationsQueue.push(notification);
    if (!this.isShowNextNotification) {
      this.showNextNotification();
    }
  }

  showNextNotification() {
    if (this.notificationsQueue.length > 0) {
      this.isShowNextNotification = true;
      const notification = this.notificationsQueue.shift();
      if (notification) {
        this.notificationSource.next(notification);
      }
    } else {
      this.isShowNextNotification = false;
    }
  }

  closeNotification() {
    this.isShowNextNotification = false;
    this.showNextNotification();
  }
}
