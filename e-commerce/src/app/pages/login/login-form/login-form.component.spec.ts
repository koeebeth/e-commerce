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
  });
});
