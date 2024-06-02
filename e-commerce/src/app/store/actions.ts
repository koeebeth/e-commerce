import { createAction, props } from '@ngrx/store';
import {
  CategoriesArray,
  Product,
  ProductsArray,
  ProductProjectionArray,
} from '../shared/services/products/productTypes';
import { CartBase, CustomerDraft, CustomerInfo, CustomerSignin } from '../shared/services/commercetoolsApi/apitypes';

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
///
export const loadAnonymousCartSuccess = createAction(
  '[Cart] Cart Anonymous Id Success',
  props<{ cartBase: CartBase }>(),
);
export const loadAnonymousCartFailure = createAction('[Cart] Cart Anonymous Id Failure', props<{ error: string }>());
///
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
///
export const loadProducts = createAction('[Products] Load Products', props<{ offset: number; limit: number }>());
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: ProductsArray }>(),
);
export const loadProductsFailure = createAction('[Products] Load Products Failure', props<{ error: string }>());
///
export const loadProductId = createAction('[Product] Load ProductID', props<{ id: string }>());
export const loadProductIdSuccess = createAction('[Product] Load ProductID Success', props<{ product: Product }>());
export const loadProductIdFailure = createAction('[Product] Load ProductID Failure', props<{ error: string }>());
///
export const loadCategories = createAction('[Product] Load Categories', props<{ offset: number; limit: number }>());
export const loadCategoriesSuccess = createAction(
  '[Product] Load Categories Success',
  props<{ categories: CategoriesArray }>(),
);
export const loadCategoriesFailure = createAction('[Product] Load Categories Failure', props<{ error: string }>());
///
export const loadFilter = createAction(
  '[Filter] Load Filter',
  props<{ offset: number; limit: number; categoryIds: string[]; sort?: string }>(),
);
export const loadFilterSuccess = createAction('[Filter] Load Filter Success', props<{ products: ProductsArray }>());
export const loadFilterFailure = createAction('[Filter] Load Filter Failure', props<{ error: string }>());
