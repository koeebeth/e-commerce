import { createSelector } from '@ngrx/store';
import { AppState } from './store';

const selectEcommerceState = (state: AppState) => state.app;

export const selectAccessToken = createSelector(selectEcommerceState, (state) => state.accessToken);

export const selectAnonymousToken = createSelector(selectEcommerceState, (state) => state.anonymousToken);

export const selectCartBase = createSelector(selectEcommerceState, (state) => state.cartBase);
export const selectCartAnonId = createSelector(selectCartBase, (state) => state?.anonymousId);

export const selectError = createSelector(selectEcommerceState, (state) => state.error);

export const selectLoading = createSelector(selectEcommerceState, (state) => state.loading);

export const selectUserInfo = createSelector(selectEcommerceState, (state) => state.userInfo);
