export interface ProductsArray {
  offset: number;
  limit: number;
  count: number;
  total: number;
  results: Product[];
}

export interface ProductProjectionArray {
  limit: number;
  count: number;
  total: number;
  offset: number;
  results: ProductData[];
}

export interface Product {
  id: string;
  key?: string;
  name?: LocalizedString;
  categories?: Reference[];
  description?: LocalizedString;
  slug?: LocalizedString;
  masterVariant?: ProductVariant;
  variants?: ProductVariant[];
  createdAt?: string;
  lastModifiedAt?: string;
  masterData: MasterData;
  productType?: Reference;
  taxCategory?: Reference;
  state?: Reference;
  version?: number;
  categoryOrderHints?: LocalizedString;
}
export interface MasterData {
  current?: ProductData;
  staged?: ProductData;
}

export interface ProductData {
  id: string;
  key?: string;
  name: LocalizedString;
  categories?: Reference[];
  createdAt?: string;
  description?: LocalizedString;
  lastModifiedAt?: string;
  slug?: LocalizedString;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
  metaKeywords?: LocalizedString;
  masterVariant?: ProductVariant;
  variants?: ProductVariant[];
  hasStagedChanges?: boolean;
  published?: boolean;
  taxCategory?: Reference;
  state?: Reference;
  reviewRatingStatistics?: ReviewRatingStatistics;
  productType?: Reference;
  version: number;
  categoryOrderHints?: { [key: string]: string };
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
  id?: string;
  value: Money;
  country?: string;
  customerGroup?: Reference;
  channel?: Reference;
  validFrom?: string;
  validUntil?: string;
  discounted?: DiscountedPrice;
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

// Categories
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

export interface Asset {
  id: string;
  sources: AssetSource[];
  name: LocalizedString;
  description?: LocalizedString;
  tags?: string[];
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
