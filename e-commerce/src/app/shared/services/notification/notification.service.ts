import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class NotificationService {
  private notificationSource = new BehaviorSubject<{ type: string; message: string }>({ type: '', message: '' });

  currentNotification = this.notificationSource.asObservable();

  showNotification(type: string, message: string) {
    this.notificationSource.next({ type, message });
  }
}
