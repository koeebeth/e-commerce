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
  middleName?: string;
  title?: string;
  anonymousCart?: string;
  anonymousId?: string;
  dateOfBirth?: string;
  companyName?: string;
  addresses?: Address[];
  defaultShippingAddressId?: number;
  defaultBillingAddressId?: number;
}

export interface Address {
  id?: string;
  title?: string;
  salutation?: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  streetNumber?: string;
  additionalStreetInfo?: string;
  postalCode?: string;
  city?: string;
  region?: string;
  state?: string;
  country?: string;
  company?: string;
  department?: string;
  building?: string;
  apartment?: string;
  pOBox?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  fax?: string;
  additionalAddressInfo?: string;
  externalId?: string;
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
