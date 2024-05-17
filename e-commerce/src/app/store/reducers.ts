import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { CartBase } from '../shared/services/commercetoolsApi/apitypes';

export interface EcommerceState {
  accessToken: string;
  anonymousToken: string;
  cartBase: CartBase | null;
  loading: boolean;
  error: string;
}

export const initialState: EcommerceState = {
  accessToken: '',
  anonymousToken: '',
  cartBase: null,
  loading: false,
  error: '',
};

export const ecommerceReducer = createReducer(
  initialState,

  on(actions.loadAccsessToken, (state) => ({ ...state, loading: true })),

  on(actions.loadAccsessTokenSuccess, (state, { accessToken }) => ({ ...state, accessToken, loading: false })),

  on(actions.loadAccsessTokenFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(actions.loadAnonymousToken, (state) => ({ ...state, loading: true })),

  on(actions.loadAnonymousTokenSuccess, (state, { anonymousToken }) => ({ ...state, anonymousToken, loading: false })),

  on(actions.loadAnonymousTokenFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(actions.loadAnonymousIdSuccess, (state, { cartBase }) => ({ ...state, cartBase, loading: false })),

  on(actions.loadAnonymousIdFailure, (state, { error }) => ({ ...state, error, loading: false })),
);
