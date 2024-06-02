import { createAction, props } from '@ngrx/store';
import {
  CartBase,
  CustomerDraft,
  CustomerInfo,
  CustomerSignin,
  PasswordChange,
} from '../shared/services/commercetoolsApi/apitypes';
import { Product, ProductPagedQueryResponse } from '../shared/services/products/productTypes';

export const loadAccsessToken = createAction('[Auth] Load Access Token', props<{ accessData: CustomerSignin }>());
export const refreshAccsessToken = createAction(
  '[Auth] Update Access Token',
  props<{ refreshToken: string; basic: string }>(),
);
export const loadAccsessTokenSuccess = createAction(
  '[Auth] Load Access Token Success',
  props<{ accessToken: string }>(),
);
export const loadAccsessTokenFailure = createAction('[Auth] Load Access Token Failure', props<{ error: string }>());

export const loadRegistration = createAction(
  '[Registration] Load Registration',
  props<{ customerDraft: CustomerDraft }>(),
);
export const loadRegistrationSuccess = createAction(
  '[Registration] Load Registration Success',
  props<{ accessData: CustomerSignin }>(),
);
export const loadRegistrationFailure = createAction(
  '[Registration] Load Registration Failure',
  props<{ error: string }>(),
);

export const loadAnonymousToken = createAction('[Auth] Load Anonymous Token');
export const updateAnonymousToken = createAction(
  '[Auth] Update Anonymous Token',
  props<{ refreshToken: string; basic: string }>(),
);
export const loadAnonymousTokenSuccess = createAction(
  '[Auth] Load Anonymous Token Success',
  props<{ anonymousToken: string }>(),
);
export const loadAnonymousTokenFailure = createAction(
  '[Auth] Load Anonymous Token Failure',
  props<{ error: string }>(),
);

export const loadUserInfo = createAction('[Auth] Load User Info');
export const loadUserInfoSuccess = createAction('[Auth] Load User Success', props<{ userInfo: CustomerInfo }>());
export const loadUserInfoFailure = createAction('[Auth] Load User Failure', props<{ error: string }>());

export const loadUpdateUserInfo = createAction('[User] Load Updating User Info', props<{ userInfo: CustomerInfo }>());
export const loadUpdateUserInfoSuccess = createAction(
  '[User] Load Updating User Success',
  props<{ userInfo: CustomerInfo }>(),
);
export const loadUpdateUserInfoFailure = createAction('[User] Load Updating User Failure', props<{ error: string }>());

export const loadUpdateUserPassword = createAction(
  '[User] Load Updating User Password',
  props<{ version: number; passwordData: PasswordChange }>(),
);
export const loadUpdateUserPasswordSuccess = createAction(
  '[User] Load Updating User Password Success',
  props<{ userInfo: CustomerInfo }>(),
);
export const loadUpdateUserPasswordFailure = createAction(
  '[User] Load Updating User Password Failure',
  props<{ error: string }>(),
);


export const loadAnonymousCartSuccess = createAction(
  '[Cart] Cart Anonymous Id Success',
  props<{ cartBase: CartBase }>(),
);
export const loadAnonymousCartFailure = createAction('[Cart] Cart Anonymous Id Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

export const loadProducts = createAction('[Auth] Load Access Token', props<{ offset: number; limit: number }>());
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: ProductPagedQueryResponse }>(),
);
export const loadProductsFailure = createAction('[Products] Load Products Failure', props<{ error: string }>());

export const loadProductId = createAction('[Product] Load Products', props<{ id: string }>());
export const loadProductIdSuccess = createAction('[Product] Load Products Success', props<{ product: Product }>());
export const loadProductIdFailure = createAction('[Product] Load Products Failure', props<{ error: string }>());
