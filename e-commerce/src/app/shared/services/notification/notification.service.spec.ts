import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not add a notification with an invalid type', () => {
    spyOn(service, 'showNextNotification').and.callThrough();
    const type = 'invalidType';
    const message = 'Test invalid message';
    service.showNotification(type, message);
    expect(service['notificationsQueue'].length).toBe(0);
    expect(service.showNextNotification).not.toHaveBeenCalled();
  });

  it('should close the current notification and show the next one after a delay if there are more notifications', (done) => {
    const type1 = 'success';
    const message1 = 'Test success message 1';
    const type2 = 'error';
    const message2 = 'Test error message 2';
    service.showNotification(type1, message1);
    service.showNotification(type2, message2);
    service.closeNotification();
    expect(service['isShowNextNotification']).toBeFalse();
    setTimeout(() => {
      expect(service['isShowNextNotification']).toBeTrue();
      expect(service['notificationSource'].value).toEqual({ type: type2, message: message2 });
      done();
    }, 200);
  });

  it('should close the current notification and not show any new notifications if the queue is empty', () => {
    service.showNotification('success', 'Test message');
    service.closeNotification();
    expect(service['isShowNextNotification']).toBeFalse();
    setTimeout(() => {
      expect(service['isShowNextNotification']).toBeFalse();
    }, 200);
  });
});
