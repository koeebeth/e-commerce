import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';
import LoginFormComponent from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent],
      providers: [provideStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email', () => {
    const form = component.loginForm;
    const emailInput = form.controls['email'];
    expect(emailInput.valid).withContext('with empty email').toBe(false);
    emailInput.setValue('aBc@example.com');
    expect(emailInput.valid).withContext('with uppercase letters').toBe(false);
    emailInput.setValue('ab..c@example.com');
    expect(emailInput.valid).withContext('with multiple periods').toBe(false);
    emailInput.setValue('abc@example.com');
    expect(emailInput.valid).withContext('with valid email').toBe(true);
  });

  it('should validate password', () => {
    const form = component.loginForm;
    const passwordInput = form.controls['password'];
    expect(passwordInput.valid).withContext('with empty password').toBe(false);
  });

  it('should toggle password', () => {
    const passwordInput = fixture.nativeElement.querySelector('input[name="password"]');
    const showBtn = fixture.nativeElement.querySelector('.login-form-password button');
    expect(passwordInput.type).withContext('should hide on init').toBe('password');
    showBtn.click();
    fixture.detectChanges();
    expect(passwordInput.type).withContext('should show on click').toBe('text');
    showBtn.click();
    fixture.detectChanges();
    expect(passwordInput.type).withContext('should hide on click').toBe('password');
  });
});
