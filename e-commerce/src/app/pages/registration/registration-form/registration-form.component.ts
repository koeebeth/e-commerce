import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import InputComponent from '../../../shared/components/input/input.component';
import ButtonComponent from '../../../shared/components/button/button.component';
import RegistrationValidators from './registration-validators';
import CheckboxInputComponent from '../../../shared/components/checkbox-input/checkbox-input.component';
import SelectInputComponent from '../../../shared/components/select-input/select-input.component';
import { AppState } from '../../../store/store';
import * as actions from '../../../store/actions';
import { Address } from '../../../shared/services/commercetoolsApi/apitypes';

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

  countryIsoFormat = [
    { contry: 'United States', iso: 'US' },
    { contry: 'United Kingdom', iso: 'GB' },
    { contry: 'Germany', iso: 'DE' },
  ];

  defaultShipping = false;

  defaultBilling = false;

  singleAdress = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({});
  }

  onSubmit() {
    const billingAddress: Address = {
      city: this.registrationForm.value['billing-city'],
      country:
        this.countryIsoFormat.find((x) => x.contry === this.registrationForm.value['billing-country'])?.iso || '',
      streetNumber: this.registrationForm.value['billing-street'],
      postalCode: this.registrationForm.value['billing-postalcode'],
    };

    const shippingAddress: Address = {
      city: this.registrationForm.value['shipping-city'],
      country:
        this.countryIsoFormat.find((x) => x.contry === this.registrationForm.value['shipping-country'])?.iso || '',
      streetNumber: this.registrationForm.value['shipping-street'],
      postalCode: this.registrationForm.value['shipping-postalcode'],
    };

    const customerDraft = {
      ...this.registrationForm.value,
      addresses: [billingAddress, shippingAddress],
      firstName: this.registrationForm.value.firstname,
      lastName: this.registrationForm.value.lastname,
      dateOfBirth: this.registrationForm.value.birthdate,
      defaultBillingAddress: this.registrationForm.value['default-adress'] ? 1 : 0,
      defaultShippingAddress: this.registrationForm.value['default-adress'] ? 1 : 0,
    };

    this.store.dispatch(actions.loadRegistration({ customerDraft }));
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
