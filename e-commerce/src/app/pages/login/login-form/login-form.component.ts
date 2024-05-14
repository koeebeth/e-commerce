import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import InputComponent from '../../../shared/components/input/input.component';
import ButtonComponent from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  loginForm!: FormGroup;
  emailValidation = {
    pattern: {
      regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      errorMsg: 'Email should be in format abc.123@example.com',
    },
    required: true,
  };
  passwordValidation = {
    minlength: 8,
    pattern: {
      regex: /((?=[^ ]*\d)(?=[^ ]*[a-z])(?=[^ ]*[A-Z])(?=[^ ]*[\W])[^ ]+)/g,
      errorMsg: 'Password must contain at least one uppercase letter, lowercase letter, number and a special character',
    },
    required: true,
  };
  isValid = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({});
  }

  onKeyup() {
    if (this.loginForm.valid) this.isValid = true;
    else this.isValid = false;
    console.log(this.loginForm);
  }
}
