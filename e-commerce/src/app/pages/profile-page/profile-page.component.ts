import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppState } from '../../store/store';
import { CustomerInfo } from '../../shared/services/commercetoolsApi/apitypes';
import formatDate from '../../shared/utils/formatDate';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
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
  };

  formatDate = formatDate;

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
          console.log(userInfo);
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
}
