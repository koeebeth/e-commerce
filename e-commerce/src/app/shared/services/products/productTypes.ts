export interface ProductsArray {
  offset: number;
  limit: number;
  count: number;
  total: number;
  results: Product[];
}

export interface Product {
  id: string;
  key?: string;
  version?: number;
  createdAt?: string;
  lastModifiedAt?: string;
  masterData: ProductCatalogData;
  productType?: {
    typeId: string;
    id: string;
  };
  name?: {
    [locale: string]: string;
  };
  description?: {
    [locale: string]: string;
  };
  slug?: {
    [locale: string]: string;
  };
  masterVariant?: ProductVariant;
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

export interface ProductCatalogData {
  current?: ProductData;
  staged?: ProductData;
}

export interface ProductData {
  name: {
    [locale: string]: string;
  };
  categories?: {
    typeId: string;
    id: string;
  }[];
  description?: {
    [locale: string]: string;
  };
  slug?: {
    [locale: string]: string;
  };
  metaTitle?: {
    [locale: string]: string;
  };
  metaDescription?: {
    [locale: string]: string;
  };
  metaKeywords?: {
    [locale: string]: string;
  };
  masterVariant?: ProductVariant;
  variants?: ProductVariant[];
  searchKeywords?: {
    [locale: string]: SearchKeyword[];
  };
  hasStagedChanges?: boolean;
  published?: boolean;
  taxCategory?: {
    typeId: string;
    id: string;
  };
  state?: {
    typeId: string;
    id: string;
  };
  reviewRatingStatistics?: ReviewRatingStatistics;
  productType?: {
    typeId: string;
    id: string;
  };
}

export interface ProductVariant {
  id: number;
  sku?: string;
  key?: string;
  prices?: Price[];
  attributes?: Attribute[];
  images: Image[];
  assets?: Asset[];
  availability?: ProductVariantAvailability;
  isMatchingVariant?: boolean;
  scopedPrice?: ScopedPrice;
  scopedPriceDiscounted?: boolean;
}

export interface Price {
  value: Money;
  id?: string;
  country?: string;
  customerGroup?: Reference;
  channel?: Reference;
  validFrom?: string;
  validUntil?: string;
  discounted?: DiscountedPrice;
  custom?: CustomFields;
}

export interface Money {
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Attribute {
  name: string;
}

export interface Image {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
  label?: string;
}

export interface Asset {
  id: string;
  sources: AssetSource[];
  name: {
    [locale: string]: string;
  };
  description?: {
    [locale: string]: string;
  };
  tags?: string[];
  custom?: CustomFields;
  key?: string;
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

export interface CustomFields {
  type: Reference;
  fields: {
    [key: string]: string;
  };
}

export interface Reference {
  typeId: string;
  id: string;
}

export interface DiscountedPrice {
  value: Money;
  discount: Reference;
}

export interface ProductVariantAvailability {
  isOnStock?: boolean;
  restockableInDays?: number;
  availableQuantity?: number;
  channels?: {
    [key: string]: ProductVariantChannelAvailability;
  };
}

export interface ProductVariantChannelAvailability {
  isOnStock?: boolean;
  restockableInDays?: number;
  availableQuantity?: number;
}

export interface ScopedPrice {
  value: Money;
  currentValue: Money;
  country?: string;
  customerGroup?: Reference;
  channel?: Reference;
  validFrom?: string;
  validUntil?: string;
  discounted?: DiscountedPrice;
  custom?: CustomFields;
}

export interface SearchKeyword {
  text: string;
  suggestTokenizer?: SuggestTokenizer;
}

export interface SuggestTokenizer {
  type: string;
  inputs?: string[];
}

export interface ReviewRatingStatistics {
  averageRating: number;
  count: number;
  highestRating: number;
  lowestRating: number;
  ratingsDistribution: {
    [key: number]: number;
  };
}

//Categories
export interface CategoriesArray {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Category[];
}

export interface Category {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  name: LocalizedString;
  slug: LocalizedString;
  description?: LocalizedString;
  ancestors: Reference[];
  parent?: Reference;
  orderHint: string;
  externalId?: string;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
  metaKeywords?: LocalizedString;
  assets?: Asset[];
}

export interface LocalizedString {
  [key: string]: string;
}

export interface Reference {
  typeId: string;
  id: string;
}

export interface Asset {
  id: string;
  sources: AssetSource[];
  name: LocalizedString;
  description?: LocalizedString;
  tags?: string[];
  custom?: CustomFields;
  key?: string;
}

export interface AssetSource {
  uri: string;
  key?: string;
  dimensions?: AssetDimensions;
  contentType?: string;
}

export interface AssetDimensions {
  w: number;
  h: number;
}
