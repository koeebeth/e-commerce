import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Address, CustomerInfo } from '../../../shared/services/commercetoolsApi/apitypes';
import ButtonComponent from '../../../shared/components/button/button.component';
import { AppState } from '../../../store/store';
import AddressInputComponent from './address-input/address-input.component';
import { loadUpdateUserAddresses } from '../../../store/actions';

@Component({
  selector: 'app-manage-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, AddressInputComponent],
  templateUrl: './manage-address.component.html',
  styleUrl: './manage-address.component.scss',
})
export class ManageAddressComponent {
  addressForm!: FormGroup;

  userInfo!: CustomerInfo;

  countryIsoFormat = [
    { country: 'United States', iso: 'US' },
    { country: 'United Kingdom', iso: 'GB' },
    { country: 'Germany', iso: 'DE' },
  ];

  @Output() closeHandler = new EventEmitter();

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) {
    this.addressForm = this.fb.group({
      billing: this.fb.array([]),
      shipping: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.store
      .select((state) => state.app.userInfo)
      .subscribe((userInfo) => {
        if (userInfo) {
          this.userInfo = userInfo;
        }
      });

    this.getBillingAddresses().forEach((fg) =>
      (this.addressForm.get('billing') as FormArray).push(this.createAddress(fg)),
    );
    this.getShippingAddresses().forEach((fg) =>
      (this.addressForm.get('shipping') as FormArray).push(this.createAddress(fg)),
    );
  }

  get billingAddresses() {
    return this.addressForm.get('billing') as FormArray<FormGroup>;
  }

  get shippingAddresses() {
    return this.addressForm.get('shipping') as FormArray<FormGroup>;
  }

  onSubmit() {
    const addresses: (Address & { key: string; type: 'billing' | 'shipping' })[] = [];
    console.log(this.billingAddresses.value);
    this.billingAddresses.value.forEach((address) => {
      addresses.push({
        ...address,
        country: this.countryIsoFormat.find((c) => c.country === address.country)?.iso,
        key: Math.floor(Math.random() * 100000).toString(),
        type: 'billing',
      });
    });
    this.shippingAddresses.value.forEach((address) => {
      addresses.push({
        ...address,
        country: this.countryIsoFormat.find((c) => c.country === address.country)?.iso,
        key: Math.floor(Math.random() * 100000).toString(),
        type: 'shipping',
      });
    });

    this.store.dispatch(
      loadUpdateUserAddresses({ version: this.userInfo.version, addresses, userInfo: this.userInfo }),
    );
  }

  onClose() {
    this.closeHandler.emit();
  }

  createAddress(
    value: {
      streetNumber: string;
      city: string;
      country: string;
      postalCode: string;
    } = {
      streetNumber: '',
      city: '',
      country: '',
      postalCode: '',
    },
  ) {
    return this.fb.group({ ...value }) as FormGroup;
  }

  addAddress(type: 'billing' | 'shipping') {
    if (type === 'billing') {
      (this.addressForm.get('billing') as FormArray).push(this.createAddress());
    } else {
      (this.addressForm.get('shipping') as FormArray).push(this.createAddress());
    }
  }

  getBillingAddresses() {
    const addresses = this.userInfo.addresses.filter((a) => this.userInfo.billingAddressIds.includes(a.id || ''));
    return addresses.map((a) => ({
      ...a,
      country: this.countryIsoFormat.find((c) => c.iso === a.country)?.country || '',
    }));
  }

  getShippingAddresses() {
    const addresses = this.userInfo.addresses.filter((a) => this.userInfo.shippingAddressIds.includes(a.id || ''));
    return addresses.map((a) => ({
      ...a,
      country: this.countryIsoFormat.find((c) => c.iso === a.country)?.country || '',
    }));
  }

  deleteShippingAddress(index: number) {
    this.shippingAddresses.removeAt(index);
  }

  deleteBillingAddress(index: number) {
    this.billingAddresses.removeAt(index);
  }
}
