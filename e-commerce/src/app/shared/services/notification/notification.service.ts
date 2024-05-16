import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class NotificationService {
  private notificationSource = new BehaviorSubject<{ type: string; message: string }>({ type: '', message: '' });

  currentNotification = this.notificationSource.asObservable();

  showNotification(type: string, message: string) {
    if (type === 'error' || type === 'warning' || type === 'success') {
      this.notificationSource.next({ type, message });
    } else {
      console.error('Invalid notification type. Allowed types are: error, warning, success');
    }
  }
}
