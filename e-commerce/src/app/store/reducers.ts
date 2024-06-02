import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { Product, ProductPagedQueryResponse } from '../shared/services/products/productTypes';
import { CartBase, CustomerDraft, CustomerInfo } from '../shared/services/commercetoolsApi/apitypes';

export interface EcommerceState {
  accessToken: string;
  anonymousToken: string;
  cartBase: CartBase | null;
  products: ProductPagedQueryResponse | null;
  product: Product | null;
  customerDraft: CustomerDraft | null;
  loading: boolean;
  error: string;
  userInfo: CustomerInfo | null;
}

export const initialState: EcommerceState = {
  accessToken: '',
  anonymousToken: '',
  cartBase: null,
  products: null,
  product: null,
  customerDraft: null,
  loading: false,
  error: '',
  userInfo: null,
};

export const ecommerceReducer = createReducer(
  initialState,
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
);
