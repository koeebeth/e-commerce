import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import InputComponent from '../../../../shared/components/input/input.component';
import SelectInputComponent from '../../../../shared/components/select-input/select-input.component';
import RegistrationValidators from '../../../../shared/utils/registration-validators';
import ButtonComponent from '../../../../shared/components/button/button.component';
import CheckboxInputComponent from '../../../../shared/components/checkbox-input/checkbox-input.component';

@Component({
  selector: 'app-address-input',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    SelectInputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    CheckboxInputComponent,
  ],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
})
export default class AddressInputComponent {
  @Input() form!: FormGroup;

  @Input() defaultValue = {
    city: '',
    country: '',
    streetNumber: '',
    postalCode: '',
  };

  @Input() isDefault = false;

  @Output() delete = new EventEmitter();

  @Output() setDefault = new EventEmitter();

  selectedCountry = '';

  streetValidation = RegistrationValidators.streetValidation;

  cityValidation = RegistrationValidators.cityValidation;

  usPostalcodeValidation = RegistrationValidators.usPostalcodeValidation;

  ukPostalcodeValidation = RegistrationValidators.ukPostalcodeValidation;

  countries = ['United States', 'United Kingdom', 'Germany'];

  ngOnInit() {
    this.selectedCountry = this.defaultValue.country || this.countries[0];
    this.form.controls['streetNumber'].setValue(this.defaultValue.streetNumber);
    this.form.controls['city'].setValue(this.defaultValue.city);
    this.form.controls['country'].setValue(this.selectedCountry);
    this.form.controls['postalCode'].setValue(this.defaultValue.postalCode);
  }

  onSelectCountry(e: Event) {
    const country = (e.target as HTMLSelectElement).value;
    this.selectedCountry = country;
    this.form.controls['postalCode'].setValue('');
  }

  onDelete() {
    this.delete.emit();
  }

  onSetDefault() {
    this.setDefault.emit();
  }
}
