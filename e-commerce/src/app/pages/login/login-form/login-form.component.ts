import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import InputComponent from '../../../shared/components/input/input.component';
import ButtonComponent from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export default class LoginFormComponent {
  loginForm!: FormGroup;

  emailValidation = {
    pattern: {
      regex: /^[\w.]+@([\w]+\.)+[\w]+$/g,
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

  isValid = false;

  showPassword = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({});
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }

  onKeyup() {
    if (this.loginForm.valid) this.isValid = true;
    else this.isValid = false;
  }

  togglePasswordShow() {
    this.showPassword = !this.showPassword;
  }
}
