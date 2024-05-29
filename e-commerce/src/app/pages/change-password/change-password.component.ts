import { Component } from '@angular/core';
import InputComponent from '../../shared/components/input/input.component';
import RegistrationValidators from '../../shared/utils/registration-validators';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';
import { AppState } from '../../store/store';
import ButtonComponent from '../../shared/components/button/button.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  passwordForm!: FormGroup;

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
    this.passwordForm = this.fb.group({});
  }

  onSubmit() {
    console.log(this.passwordForm.value);
  }
}
