import { Action, ActionReducer } from '@ngrx/store';
import { EcommerceState, ecommerceReducer } from './reducers';
import { EcommerceEffects } from './effects';

export interface AppState {
  app: EcommerceState;
}

export interface AppStore {
  app: ActionReducer<EcommerceState, Action>;
}

export const appStore: AppStore = {
  app: ecommerceReducer,
};

export const appEffects = [EcommerceEffects];
