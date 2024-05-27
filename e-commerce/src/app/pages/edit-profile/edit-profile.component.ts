import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';
import { AppState } from '../../store/store';
import RegistrationValidators from '../../shared/utils/registration-validators';
import InputComponent from '../../shared/components/input/input.component';
import ButtonComponent from '../../shared/components/button/button.component';
import SelectInputComponent from '../../shared/components/select-input/select-input.component';
import CheckboxInputComponent from '../../shared/components/checkbox-input/checkbox-input.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    RouterLink,
    InputComponent,
    ButtonComponent,
    CommonModule,
    SelectInputComponent,
    CheckboxInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  editForm!: FormGroup;

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

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
  ) {}

  ngOnInit() {
    this.editForm = this.fb.group({});
  }

  onSubmit() {
    console.log(this.editForm.value);
  }
}
