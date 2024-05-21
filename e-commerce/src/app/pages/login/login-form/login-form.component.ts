import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import InputComponent from '../../../shared/components/input/input.component';
import ButtonComponent from '../../../shared/components/button/button.component';
import { AppState } from '../../../store/store';
import * as actions from '../../../store/actions';

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
      regex: /^[a-z\d]+@[a-z\.]+\.[a-z]+$/,
      errorMsg: 'Email should be in format abc.123@example.com',
    },
    required: true,
  };

  passwordValidation = {
    minlength: 8,
    pattern: {
      regex: /^(?! )((?=\S*\d)(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\W])\S*)(?<! )$/,
      errorMsg:
        'Password must contain at least one uppercase letter, lowercase letter, number, a special character and no spaces',
    },
    required: true,
  };

  isValid = false;

  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({});
  }

  onSubmit() {
    this.store.dispatch(actions.loadAccsessToken({ accessData: this.loginForm.value }));
  }

  onKeyup() {
    if (this.loginForm.valid) this.isValid = true;
    else this.isValid = false;
  }

  togglePasswordShow() {
    this.showPassword = !this.showPassword;
  }
}
