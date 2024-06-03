export interface AuthData {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export interface CustomerDraft {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  anonymousCart?: string;
  anonymousId?: string;
  dateOfBirth?: string;
  addresses?: Address[];
  defaultShippingAddress?: number;
  shippingAddresses?: number[];
  defaultBillingAddress?: number;
  billingAddresses?: number[];
}

export interface CustomerInfo {
  addresses: Address[];
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
  billingAddressIds: string[];
  shippingAddressIds: string[];
  dateOfBirth: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  version: number;
  id: string;
}

export interface Address {
  id?: string;
  city: string;
  country: string;
  streetNumber: string;
  postalCode: string;
  additionalAddressInfo?: string;
}

// If both anonymousCart and anonymousId are provided, the anonymousId on the CustomerSignin must match that of the anonymous Cart
export interface CustomerSignin {
  email: string;
  password: string;
  anonymousCart?: CartResourceIdentifier;
  anonymousId?: string;
  updateProductData?: boolean;
}

// Either id or key is required, If both are set, an InvalidJsonInput error is returned.
export interface CartResourceIdentifier {
  id?: string;
  key?: string;
  typeId?: CartBase;
}

// Documentation: https://docs.commercetools.com/api/projects/carts#cart
export interface CartBase {
  id: string;
  version: number;
  customerId?: string;
  customerEmail?: string;
  anonymousId?: string;
  lineItems: LineItem[];
  totalPrice: Money;
  billingAddress?: Address;
  shippingAddress?: Address;
  discountCodes: DiscountCodeInfo[];
  directDiscounts: DirectDiscount[];
  country?: string;
  locale?: string;
  createdAt: Date;
  lastModifiedAt: Date;
}

export interface LineItem {
  id: string;
  productId: string;
  quantity: number;
  price: Money;
  totalPrice: Money;
}

export interface Money {
  currencyCode: string;
  centAmount: number;
}

export interface DiscountCodeInfo {
  discountCode: DiscountCode;
  discountedAmount: Money;
}

export interface DiscountCode {
  id: string;
  code: string;
  isActive: boolean;
  validFrom?: Date;
  validUntil?: Date;
}

export interface DirectDiscount {
  discountType: string;
  discountedAmount: Money;
  description?: string;
}

export interface PersonalInfo {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
}
