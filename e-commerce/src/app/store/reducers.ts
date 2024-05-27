import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { CartBase, CustomerDraft } from '../shared/services/commercetoolsApi/apitypes';
import { Product } from '../shared/services/products/productTypes';

export interface EcommerceState {
  accessToken: string;
  anonymousToken: string;
  cartBase: CartBase | null;
  products: Product[];
  customerDraft: CustomerDraft | null;
  loading: boolean;
  error: string;
}

export const initialState: EcommerceState = {
  products: [],
  accessToken: '',
  anonymousToken: '',
  cartBase: null,
  customerDraft: null,
  loading: false,
  error: '',
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
  on(actions.logoutSuccess, (state) => {
    return { ...state, accessToken: '', anonymousToken: '' };
  }),
  ///
  on(actions.loadProsuctsSuccess, (state, { products }) => ({ ...state, products: products, loading: false })),
  on(actions.loadProsuctsFailure, (state, { error }) => ({ ...state, error, loading: false })),
);
