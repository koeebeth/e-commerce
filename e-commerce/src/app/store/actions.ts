import { createAction, props } from '@ngrx/store';
import { CartBase, CustomerSignin } from '../shared/services/commercetoolsApi/apitypes';

export const loadAccsessToken = createAction('[Auth] Load Access Token', props<{ accessData: CustomerSignin }>());
export const loadAccsessTokenSuccess = createAction('[Auth] Access Token Success', props<{ accessToken: string }>());
export const loadAccsessTokenFailure = createAction('[Auth] Access Token Failure', props<{ error: string }>());

export const loadAnonymousToken = createAction('[Auth] Load Anonymous Token');
export const loadAnonymousTokenSuccess = createAction(
  '[Auth] Anonymous Token Success',
  props<{ anonymousToken: string }>(),
);
export const loadAnonymousTokenFailure = createAction('[Auth] Anonymous Token Failure', props<{ error: string }>());

export const loadAnonymousIdSuccess = createAction('[Cart] Cart Anonymous Id Success', props<{ cartBase: CartBase }>());
export const loadAnonymousIdFailure = createAction('[Cart] Cart Anonymous Id Failure', props<{ error: string }>());
