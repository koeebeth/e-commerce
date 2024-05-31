import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppState } from '../../store/store';
import { CustomerInfo } from '../../shared/services/commercetoolsApi/apitypes';
import formatDate from '../../shared/utils/formatDate';
import EditUserComponent from '../edit-user/edit-user.component';
import ButtonComponent from '../../shared/components/button/button.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, RouterLink, EditUserComponent, ButtonComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export default class ProfilePageComponent {
  userInfo: CustomerInfo = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '0',
    addresses: [],
    shippingAddressIds: [],
    billingAddressIds: [],
    version: 0,
  };

  formatDate = formatDate;

  isEditing = false;

  constructor(
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
  }

  listShippingAddresses() {
    const shippingIds = this.userInfo.shippingAddressIds;

    return this.userInfo.addresses?.filter((address) => (address.id ? shippingIds?.includes(address.id) : false));
  }

  listBillingAddresses() {
    const billingIds = this.userInfo.billingAddressIds;

    return this.userInfo.addresses?.filter((address) => (address.id ? billingIds?.includes(address.id) : false));
  }

  onChangeEditMode() {
    this.isEditing = !this.isEditing;
  }
}
