import { Action, ActionReducer } from '@ngrx/store';
import { EcommerceState, ecommerceReducer } from './reducers';

export interface AppState {
  app: EcommerceState;
}

export interface AppStore {
  app: ActionReducer<EcommerceState, Action>;
}

export const appStore: AppStore = {
  app: ecommerceReducer,
};
