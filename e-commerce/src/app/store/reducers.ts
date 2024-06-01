import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { CartBase, CustomerDraft, CustomerInfo } from '../shared/services/commercetoolsApi/apitypes';

export interface EcommerceState {
  accessToken: string;
  anonymousToken: string;
  cartBase: CartBase | null;
  customerDraft: CustomerDraft | null;
  loading: boolean;
  error: string;
  userInfo?: CustomerInfo;
}

export const initialState: EcommerceState = {
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
);
