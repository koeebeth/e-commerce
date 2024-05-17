import { createAction, props } from '@ngrx/store';
import { CustomerSignin } from '../shared/services/commercetoolsApi/apitypes';

export const loadData = createAction('[Auth] Load Access Token');
export const loadAccsessToken = createAction('[Auth] Load Access Token', props<{ data: CustomerSignin }>());
export const loadAccsessTokenSuccess = createAction('[Auth] Load Access Token', props<{ token: string }>());
export const loadAccsessTokenFailure = createAction('[Auth] Load Access Token', props<{ error: string }>());

export const loadAnonymousToken = createAction('[Auth] Load Anonymous Token');
export const loadAnonymousTokenSuccess = createAction('[Auth] Load Anonymous Token', props<{ token: string }>());
export const loadAnonymousTokenFailure = createAction('[Auth] Load Anonymous Token', props<{ error: string }>());
