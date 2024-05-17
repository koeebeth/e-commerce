import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import InputComponent from '../../../shared/components/input/input.component';
import ButtonComponent from '../../../shared/components/button/button.component';
import RegistrationValidators from './registration-validators';
import { CommonModule } from '@angular/common';
import { CheckboxInputComponent } from '../../../shared/components/checkbox-input/checkbox-input.component';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, CommonModule, CheckboxInputComponent],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;

  emailValidation = RegistrationValidators.emailValidation;

  passwordValidation = RegistrationValidators.passwordValidation;

  nameValidation = RegistrationValidators.nameValidation;

  streetValidation = RegistrationValidators.streetValidation;

  cityValidation = RegistrationValidators.cityValidation;

  postalCodeValidation = RegistrationValidators.postalCodeValidation;

  ageValidation = RegistrationValidators.ageValidation;

  countryList = ['United States', 'United Kingdom', 'Germany'];

  singleAdress = false;

  isValid = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({});
  }

  onSubmit() {
    console.log(this.registrationForm.value);
  }

  onKeyup() {
    if (this.registrationForm.valid) this.isValid = true;
    else this.isValid = false;
  }

  onCheckSingleAdress() {
    this.singleAdress = !this.singleAdress;
  }
}
