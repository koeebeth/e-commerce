import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { CategoriesArray, Product, ProductsArray } from '../shared/services/products/productTypes';
import {
  CartBase,
  CustomerDraft,
  CustomerInfo,
  CustomerSignInResult,
} from '../shared/services/commercetoolsApi/apitypes';

export interface EcommerceState {
  customerSignIn: CustomerSignInResult | null;
  accessToken: string;
  anonymousToken: string;
  cartBase: CartBase | null;
  products: ProductsArray | null;
  product: Product | null;
  categories: CategoriesArray | null;
  customerDraft: CustomerDraft | null;
  loading: boolean;
  error: string;
  userInfo: CustomerInfo | null;
  offset: number;
  limit: number;
  searchText?: string;
  filters: { [key: string]: string[] };
  sort: string;
}

export const initialState: EcommerceState = {
  customerSignIn: null,
  accessToken: '',
  anonymousToken: '',
  cartBase: null,
  products: null,
  product: null,
  categories: null,
  customerDraft: null,
  loading: false,
  error: '',
  userInfo: null,
  offset: 0,
  limit: 10,
  searchText: '',
  filters: {},
  sort: '',
};

export const ecommerceReducer = createReducer(
  initialState,
  ///
  on(actions.loginUser, (state) => ({ ...state, loading: true })),
  on(actions.loginUerSuccess, (state, { customerSignIn }) => ({ ...state, customerSignIn, loading: false })),
  on(actions.loginUerFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
  on(actions.loadAccsessToken, (state) => ({ ...state, loading: true })),
  on(actions.loadAccsessTokenSuccess, (state, { accessToken }) => ({ ...state, accessToken, loading: false })),
  on(actions.loadAccsessTokenFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
  on(actions.loadAnonymousToken, (state) => ({ ...state, loading: true })),
  on(actions.loadAnonymousTokenSuccess, (state, { anonymousToken }) => ({ ...state, anonymousToken, loading: false })),
  on(actions.loadAnonymousTokenFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
  on(actions.loadAnonymousCartSuccess, (state, { cartBase }) => ({ ...state, cartBase, loading: false })),
  on(actions.loadAnonymousCartFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
  on(actions.loadUserCartSuccess, (state, { cartBase }) => ({ ...state, cartBase, loading: false })),
  on(actions.loadUserCartFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
  on(actions.applyDiscountSuccess, (state, { cartBase }) => ({ ...state, cartBase, loading: false })),
  on(actions.applyDiscountFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
  on(actions.loadUpdateAnonymousCart, (state) => ({ ...state, loading: true })),
  on(actions.loadUpdateAnonymousCartSuccess, (state, { cartBase }) => ({ ...state, cartBase, loading: false })),
  on(actions.loadUpdateAnonymousCartFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
  on(actions.loadRegistration, (state) => ({ ...state, loading: true })),
  on(actions.loadRegistrationSuccess, (state) => ({ ...state, loading: false })),
  on(actions.loadRegistrationFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
  on(actions.loadUserInfo, (state) => ({ ...state, loading: true })),
  on(actions.loadUserInfoSuccess, (state, { userInfo }) => ({ ...state, userInfo, loading: false })),
  on(actions.loadUserInfoFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
  on(actions.loadUpdateUserInfo, (state) => ({ ...state, loading: true })),
  on(actions.loadUpdateUserInfoSuccess, (state, { userInfo }) => ({ ...state, userInfo, loading: false })),
  on(actions.loadUpdateUserInfoFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
  on(actions.loadUpdateUserPassword, (state) => ({ ...state, loading: true })),
  on(actions.loadUpdateUserPasswordSuccess, (state, { userInfo }) => ({ ...state, userInfo, loading: false })),
  on(actions.loadUpdateUserPasswordFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
  on(actions.loadUpdateUserAddresses, (state) => ({ ...state, loading: true })),
  on(actions.loadUpdateUserAddressesSuccess, (state, { userInfo }) => ({ ...state, userInfo, loading: false })),
  on(actions.loadUpdateUserAddressesFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
  on(actions.logoutSuccess, (state) => {
    return { ...state, accessToken: '', anonymousToken: '' };
  }),
  ///
  on(actions.loadProducts, (state) => ({ ...state, loading: true })),
  on(actions.loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false })),
  on(actions.loadProductsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
  on(actions.loadProductId, (state) => ({ ...state, loading: true })),
  on(actions.loadProductIdSuccess, (state, { product }) => ({ ...state, product, loading: false })),
  on(actions.loadProductIdFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
  on(actions.loadCategories, (state) => ({ ...state, loading: true })),
  on(actions.loadCategoriesSuccess, (state, { categories }) => ({ ...state, categories, loading: false })),
  on(actions.loadCategoriesFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
  ///
  on(actions.loadFilter, (state) => ({ ...state, loading: true })),
  on(actions.saveFilter, (state, { filters }) => ({
    ...state,
    filters: filters || {},
  })),
  on(actions.saveSort, (state, { sort }) => ({
    ...state,
    sort: sort || '',
  })),
  on(actions.loadFilterSuccess, (state, { products }) => {
    return { ...state, products, loading: false };
  }),
  on(actions.resetFilter, (state) => ({ ...state, filters: {}, sort: '' })),
  on(actions.loadFilterFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(actions.loadFilterFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ///
);
