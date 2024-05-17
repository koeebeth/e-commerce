import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  countryList = ['United States', 'United Kingdom', 'Germany'];

  postcodeValidation = {
    billing: {
      custom: {
        validator: this.billingPostcodeValidator.bind(this),
        name: 'billing-postcode',
        errorMsg: 'Invalid postcode format for selected country',
      },
    },
    shipping: {
      custom: {
        validator: this.shippingPostcodeValidator.bind(this),
        name: 'shipping-postcode',
        errorMsg: 'Invalid postcode format for selected country',
      },
    },
  };

  singleAdress = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({});
  }

  onSubmit() {
    console.log(this.registrationForm.value);
  }

  onKeyup() {
    if (this.singleAdress) {
      const form = this.registrationForm;
      form.setValue({
        ...form.value,
        'billing-country': form.value['shipping-country'],
        'billing-street': form.value['shipping-street'],
        'billing-postalcode': form.value['shipping-postalcode'],
        'billing-city': form.value['shipping-city'],
      });
    }
  }

  onCheckSingleAdress() {
    this.singleAdress = !this.singleAdress;
    if (this.singleAdress) {
      const form = this.registrationForm;
      form.setValue({
        ...form.value,
        'billing-country': form.value['shipping-country'],
        'billing-street': form.value['shipping-street'],
        'billing-postalcode': form.value['shipping-postalcode'],
        'billing-city': form.value['shipping-city'],
      });
    }
  }

  shippingPostcodeValidator(control: AbstractControl) {
    const selectedCountry = this.registrationForm.value['shipping-country'];
    let regex;
    if (selectedCountry === 'United States' || selectedCountry === 'Germany') {
      regex = /^[0-9]{5}$/g;
    } else {
      regex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/g;
    }

    if (regex.test(control.value)) return null;

    return {
      'shipping-postcode': false,
    };
  }

  billingPostcodeValidator(control: AbstractControl) {
    const selectedCountry = this.registrationForm.value['billing-country'];
    let regex;
    if (selectedCountry === 'United States' || selectedCountry === 'Germany') {
      regex = /^[0-9]{5}$/g;
    } else {
      regex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/g;
    }

    if (regex.test(control.value)) return null;

    return {
      'billing-postcode': false,
    };
  }
}
