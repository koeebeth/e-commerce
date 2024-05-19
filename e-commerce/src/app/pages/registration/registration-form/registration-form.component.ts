import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import InputComponent from '../../../shared/components/input/input.component';
import ButtonComponent from '../../../shared/components/button/button.component';
import RegistrationValidators from './registration-validators';
import CheckboxInputComponent from '../../../shared/components/checkbox-input/checkbox-input.component';
import SelectInputComponent from '../../../shared/components/select-input/select-input.component';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    CheckboxInputComponent,
    SelectInputComponent,
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export default class RegistrationFormComponent {
  registrationForm!: FormGroup;

  emailValidation = RegistrationValidators.emailValidation;

  passwordValidation = RegistrationValidators.passwordValidation;

  nameValidation = RegistrationValidators.nameValidation;

  streetValidation = RegistrationValidators.streetValidation;

  cityValidation = RegistrationValidators.cityValidation;

  ageValidation = RegistrationValidators.ageValidation;

  usPostalcodeValidation = RegistrationValidators.usPostalcodeValidation;

  ukPostalcodeValidation = RegistrationValidators.ukPostalcodeValidation;

  countryList = ['United States', 'United Kingdom', 'Germany'];

  defaultShipping = false;

  defaultBilling = false;

  singleAdress = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({});
  }

  onSubmit() {
    // Send data to server
    console.log(this.registrationForm.value);
  }

  onKeyup() {
    if (this.singleAdress) {
      this.copyShippingToBilling();
    }
  }

  onCheckSingleAdress() {
    this.singleAdress = !this.singleAdress;
    if (this.singleAdress) {
      this.copyShippingToBilling();
    }
  }

  copyShippingToBilling() {
    const form = this.registrationForm;
    form.controls['billing-country'].setValue(form.controls['shipping-country'].value);
    form.controls['billing-street'].setValue(form.controls['shipping-street'].value);
    form.controls['billing-postalcode'].setValue(form.controls['shipping-postalcode'].value);
    form.controls['billing-city'].setValue(form.controls['shipping-city'].value);
  }

  onCheckDefault(address: string) {
    if (address === 'shipping') this.defaultShipping = !this.defaultShipping;
    if (address === 'billing') this.defaultBilling = !this.defaultBilling;
  }

  onCountryChange(address: 'shipping' | 'billing') {
    this.registrationForm.removeControl(`${address}-country`);
  }
}
