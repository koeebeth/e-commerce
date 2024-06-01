import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import InputComponent from '../../../../shared/components/input/input.component';
import SelectInputComponent from '../../../../shared/components/select-input/select-input.component';
import RegistrationValidators from '../../../../shared/utils/registration-validators';
import { CommonModule } from '@angular/common';
import ButtonComponent from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-address-input',
  standalone: true,
  imports: [CommonModule, InputComponent, SelectInputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
})
export class AddressInputComponent {
  @Input() form!: FormGroup;

  @Input() defaultValue = {
    city: '',
    country: '',
    streetNumber: '',
    postalCode: '',
  };

  @Output() delete = new EventEmitter();

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
}
