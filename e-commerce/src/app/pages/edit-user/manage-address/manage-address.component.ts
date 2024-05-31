import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerInfo } from '../../../shared/services/commercetoolsApi/apitypes';
import ButtonComponent from '../../../shared/components/button/button.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store';

@Component({
  selector: 'app-manage-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './manage-address.component.html',
  styleUrl: './manage-address.component.scss',
})
export class ManageAddressComponent {
  addressForm!: FormGroup;

  currentPasswordVisibility = false;

  newPasswordVisibility = false;

  userInfo!: CustomerInfo;

  @Output() closeHandler = new EventEmitter();

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.store
      .select((state) => state.app.userInfo)
      .subscribe((userInfo) => {
        if (userInfo) {
          this.userInfo = userInfo;
        }
      });
    this.addressForm = this.fb.group({});
  }

  onSubmit() {
    console.log(this.addressForm.value);
  }

  onClose() {
    this.closeHandler.emit();
  }
}
