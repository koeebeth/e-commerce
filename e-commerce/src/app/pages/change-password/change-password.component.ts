import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';
import RegistrationValidators from '../../shared/utils/registration-validators';
import InputComponent from '../../shared/components/input/input.component';
import { AppState } from '../../store/store';
import ButtonComponent from '../../shared/components/button/button.component';
import { CustomerInfo } from '../../shared/services/commercetoolsApi/apitypes';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export default class ChangePasswordComponent {
  passwordForm!: FormGroup;

  userInfo: CustomerInfo | null = null;

  passwordValidation = RegistrationValidators.passwordValidation;

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
        }
      });
    this.passwordForm = this.fb.group({});
  }

  onSubmit() {
    console.log(this.passwordForm.value);
  }
}
