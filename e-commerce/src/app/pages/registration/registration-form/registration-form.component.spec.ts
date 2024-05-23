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

  it('should check default address', () => {
    component.onCheckDefault('shipping');
    expect(component.defaultShipping).withContext('shipping default').toBe(true);
    component.onCheckDefault('billing');
    expect(component.defaultBilling).withContext('billing default').toBe(true);
  });
});
