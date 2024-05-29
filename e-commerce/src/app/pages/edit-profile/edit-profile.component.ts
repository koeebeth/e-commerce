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
import { CustomerInfo } from '../../shared/services/commercetoolsApi/apitypes';

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
    CheckboxInputComponent,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export default class EditProfileComponent {
  userInfo: CustomerInfo | null = null;

  editForm!: FormGroup;

  changePassword = false;

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
    this.store
      .select((state) => state.app.accessToken)
      .subscribe((accessToken) => {
        if (!accessToken) {
          this.router.navigate(['/main']);
        }
      });
    this.store
      .select((state) => state.app.userInfo)
      .subscribe((userInfo) => {
        if (userInfo) {
          this.userInfo = userInfo;
          console.log(this.userInfo);
        }
      });
    this.editForm = this.fb.group({});
  }

  onCheckChangePassword() {
    this.changePassword = !this.changePassword;
    if (!this.changePassword) {
      this.editForm.removeControl('old-password');
      this.editForm.removeControl('new-password');
    }
  }

  onSubmit() {
    console.log(this.editForm.value);
  }
}
