import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ValidatorFn, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="input-group">
      <label [for]="name">{{ label }}</label>
      <input [type]="type" [formControl]="control" [name]="name" />
      <div class="input-errors" *ngIf="control.invalid && control.dirty">
        <p *ngIf="control.errors?.['minlength']">
          Field should be at least {{ validation.minlength }} characters long.
        </p>
        <p *ngIf="control.errors?.['email']">Field should in format abc&#64;example.com</p>
        <p *ngIf="control.errors?.['required']">Field is required</p>
        <p *ngIf="control.errors?.['pattern']">
          {{ validation.pattern?.errorMsg }}
        </p>
      </div>
    </div>
  `,
  styleUrl: './input.component.scss',
})
export default class InputComponent {
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
  }
}
