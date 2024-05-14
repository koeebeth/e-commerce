import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import InputComponent from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  inputForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  emailValidation = {
    pattern: {
      regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      errorMsg: 'Email should be in format abc.123@example.com',
    },
  };
  passwordValidation = {
    minlength: 8,
    pattern: {
      regex: /((?=[^ ]*\d)(?=[^ ]*[a-z])(?=[^ ]*[A-Z])(?=[^ ]*[\W])[^ ]+)/g,
      errorMsg: 'Password must contain at least one uppercase letter, lowercase letter, number and a special character',
    },
  };
}
