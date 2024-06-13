import { createAction, props } from '@ngrx/store';
import { CategoriesArray, Product, ProductsArray } from '../shared/services/products/productTypes';
import {
  CartBase,
  CustomerDraft,
  CustomerInfo,
  CustomerSignin,
  PasswordChange,
  Address,
} from '../shared/services/commercetoolsApi/apitypes';

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

export const loadUserCart = createAction('[Cart] Load User Cart');
export const loadUserCartSuccess = createAction('[Cart] Load User Cart Success', props<{ cartBase: CartBase }>());
export const loadUserCartFailure = createAction('[Cart] Load User Cart Failure', props<{ error: string }>());

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

export const loadUpdateUserAddresses = createAction(
  '[User] Load Updating User Addresses',
  props<{
    version: number;
    addresses: (Address & { key: string; type: 'billing' | 'shipping'; default: boolean })[];
    userInfo: CustomerInfo;
  }>(),
);
export const loadUpdateUserAddressesSuccess = createAction(
  '[User] Load Updating User Addresses',
  props<{ userInfo: CustomerInfo }>(),
);
export const loadUpdateUserAddressesFailure = createAction(
  '[User] Load Updating User Addresses',
  props<{ error: string }>(),
);
export const loadUpdateAnonymousCart = createAction(
  '[Cart] Load Updating Cart Anonymous',
  props<{
    action: 'add' | 'remove';
    lineItemId?: string;
    productId?: string;
    cartBase: CartBase;
  }>(),
);
export const loadUpdateAnonymousCartSuccess = createAction(
  '[Cart] Load Updating Cart Anonymous Success',
  props<{ cartBase: CartBase }>(),
);
export const loadUpdateAnonymousCartFailure = createAction(
  '[Cart] Load Updating Cart Anonymous Failure',
  props<{ error: string }>(),
);
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
export const loadCategories = createAction('[Categories] Load Categories', props<{ offset: number; limit: number }>());
export const loadCategoriesSuccess = createAction(
  '[Categories] Load Categories Success',
  props<{ categories: CategoriesArray }>(),
);
export const loadCategoriesFailure = createAction('[Categories] Load Categories Failure', props<{ error: string }>());
///
export const loadFilter = createAction(
  '[Filter] Load Filter',
  props<{ offset: number; limit: number; searchText?: string; filters?: { [key: string]: string[] }; sort?: string }>(),
);

export const resetFilter = createAction('[Filter] Reset Filter');
export const saveFilter = createAction('[Filter] Save Filter', props<{ filters?: { [key: string]: string[] } }>());
export const saveSort = createAction('[Filter] Save Sort', props<{ sort?: string }>());
export const loadFilterSuccess = createAction('[Filter] Load Filter Success', props<{ products: ProductsArray }>());
export const loadFilterFailure = createAction('[Filter] Load Filter Failure', props<{ error: string }>());
