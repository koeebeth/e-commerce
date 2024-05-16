import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import InputComponent from '../../../shared/components/input/input.component';
import ButtonComponent from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;

  emailValidation = {
    pattern: {
      regex: /^[\w.]+@([\w]+.)+[\w]+$/,
      errorMsg: 'Email should be in format abc.123@example.com',
    },
    required: true,
  };

  passwordValidation = {
    minlength: 8,
    pattern: {
      regex: /(?=[^\s]*\d)(?=[^\s]*[a-z])(?=[^ ]*[A-Z])(?=[^ ]*[\W])(?<!\s)/g,
      errorMsg:
        'Password must contain at least one uppercase letter, lowercase letter, number, a special character and no spaces',
    },
    required: true,
  };

  nameValidation = {
    required: true,
    pattern: {
      regex: /^[a-zA-Z\-]+[^\-]$/,
      errorMsg: 'Name should contain only letters and hyphens and end with a letter',
    },
  };

  isValid = false;

  showPassword = false;

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

  togglePasswordShow() {
    this.showPassword = !this.showPassword;
  }
}
