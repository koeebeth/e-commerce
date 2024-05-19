import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ValidatorFn, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export default class InputComponent {
  @Input() form!: FormGroup;

  @Input() name: string = '';

  @Input() type: string = 'text';

  @Input() label: string = '';

  @Input() validation: {
    minlength?: number;
    pattern?: {
      regex: RegExp;
      errorMsg: string;
    };
    email?: boolean;
    required?: boolean;
  } = {};

  control!: FormControl;

  validators: ValidatorFn[] = [];

  ngOnInit() {
    const { minlength, pattern, email, required } = this.validation;
    if (minlength) this.validators.push(Validators.minLength(minlength));
    if (email) this.validators.push(Validators.email);
    if (required) this.validators.push(Validators.required);
    if (pattern) this.validators.push(Validators.pattern(pattern.regex));

    this.control = new FormControl('', this.validators);
    this.form.addControl(this.name, this.control);
  }
}
