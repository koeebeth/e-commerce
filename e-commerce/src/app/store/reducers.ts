import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';

export interface EcommerceState {
  token: string;
  anonymousToken: string;
  loading: boolean;
  error: string;
}

export const initialState: EcommerceState = {
  token: '',
  anonymousToken: '',
  loading: false,
  error: '',
};

export const ecommerceReducer = createReducer(
  initialState,

  on(actions.loadData, (state) => ({ ...state, loading: true })),

  on(actions.loadAccsessToken, (state) => ({ ...state, loading: true })),

  on(actions.loadAccsessTokenSuccess, (state, { token }) => ({ ...state, token, loading: false })),

  on(actions.loadAccsessTokenFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(actions.loadAnonymousToken, (state) => ({ ...state, loading: true })),

  on(actions.loadAnonymousTokenSuccess, (state, { token }) => ({ ...state, anonymousToken: token, loading: false })),

  on(actions.loadAnonymousTokenFailure, (state, { error }) => ({ ...state, error, loading: false })),
);
