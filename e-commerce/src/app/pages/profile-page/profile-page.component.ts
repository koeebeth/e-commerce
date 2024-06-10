import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    defaultBillingAddressId: '',
    defaultShippingAddressId: '',
    id: '',
  };

  formatDate = formatDate;

  isEditing = false;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.store
      .select((state) => state.app.accessToken)
      .subscribe((accessToken) => {
        const authRefresh = localStorage.getItem('AuthRefresh');
        if (!accessToken && !authRefresh) {
          this.router.navigate(['/login']);
        }
      });

    this.store
      .select((state) => state.app.userInfo)
      .subscribe((userInfo) => {
        if (userInfo) {
          this.userInfo = userInfo;
          this.activatedRoute.queryParams.subscribe((params) => {
            if (params['id'] !== userInfo.id) {
              this.router.navigate(['profile'], { queryParams: { id: this.userInfo.id } });
            }
          });
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
