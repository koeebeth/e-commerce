export interface Product {
  id: string;
  key?: string;
  version?: number;
  createdAt: string;
  lastModifiedAt: string;
  productType: {
    typeId: string;
    id: string;
  };
  name: {
    [locale: string]: string;
  };
  description?: {
    [locale: string]: string;
  };
  slug?: {
    [locale: string]: string;
  };
  masterVariant: ProductVariant;
  variants?: ProductVariant[];
  taxCategory?: {
    typeId: string;
    id: string;
  };
  state?: {
    typeId: string;
    id: string;
  };
  categories?: {
    typeId: string;
    id: string;
  }[];
  categoryOrderHints?: {
    [categoryId: string]: string;
  };
}

export interface ProductVariant {
  id: number;
  sku: string;
  key?: string;
  prices?: ProductPrice[];
  images?: ProductImage[];
  attributes?: Attribute[];
  assets?: Asset[];
  availability?: ProductVariantAvailability;
  isMatchingVariant?: boolean;
}

export interface ProductVariantAvailability {
  isOnStock: boolean;
  restockableInDays?: number;
  availableQuantity?: number;
  channels?: {
    [channelId: string]: number;
  };
  onlySufficient?: boolean;
}

export interface ProductPrice {
  id?: string;
  value: Money;
  country?: string;
  customerGroup?: CustomerGroupReference;
  channel?: ChannelReference;
  validFrom?: string;
  validUntil?: string;
  discounted?: DiscountedPrice;
  custom?: CustomFields;
}

export interface Money {
  currencyCode: string;
  centAmount: number;
  fractionDigits?: number;
  type: 'centPrecision' | 'highPrecision';
}

export interface CustomerGroupReference {
  typeId: string;
  id: string;
}

export interface ChannelReference {
  typeId: string;
  id: string;
}

export interface DiscountedPrice {
  value: Money;
  discount: Reference;
}

export interface Reference {
  typeId: string;
  id: string;
}

export interface CustomFields {
  type: {
    typeId: string;
    id: string;
  };
}

export interface ProductImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
  label?: string;
}

export interface Attribute {
  name: string;
  value: any; // Здесь может быть любой тип, в зависимости от атрибута
}

export interface Asset {
  id: string;
  sources: AssetSource[];
  name?: string;
  description?: string;
  tags?: string[];
  custom?: any;
}

export interface AssetSource {
  uri: string;
  key?: string;
  dimensions?: {
    w: number;
    h: number;
  };
  contentType?: string;
}
