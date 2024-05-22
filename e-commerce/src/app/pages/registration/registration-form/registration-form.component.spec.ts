import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';
import RegistrationFormComponent from './registration-form.component';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationFormComponent],
      providers: [provideStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email', () => {
    const form = component.registrationForm;
    const emailInput = form.controls['email'];
    expect(emailInput.valid).withContext('with empty email').toBe(false);
    emailInput.setValue('aBc@example.com');
    expect(emailInput.valid).withContext('with uppercase letters').toBe(false);
    emailInput.setValue('ab..c@example.com');
    expect(emailInput.valid).withContext('with multiple periods').toBe(false);
    emailInput.setValue('abc@example.com');
    expect(emailInput.valid).withContext('with valid email').toBe(true);
  });
});
