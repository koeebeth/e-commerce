import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  mergeMap,
  map,
  catchError,
  of,
  take,
  combineLatest,
  switchMap,
  filter,
  tap,
  withLatestFrom,
  exhaustMap,
} from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import CommerceApiService from '../shared/services/commercetoolsApi/commercetoolsapi.service';
import { AuthData, CartBase, CustomerInfo } from '../shared/services/commercetoolsApi/apitypes';
import * as actions from './actions';
import TokenStorageService from '../shared/services/tokenStorage/tokenstorage.service';
import { AppState } from './store';
import { selectAccessToken, selectAnonymousToken, selectCartAnonId } from './selectors';
import { NotificationService } from '../shared/services/notification/notification.service';
import ProductsService from '../shared/services/products/products.service';
import {
  CategoriesArray,
  Product,
  ProductProjectionArray,
  ProductsArray,
} from '../shared/services/products/productTypes';

@Injectable()
export default class EcommerceEffects {
  constructor(
    private actions$: Actions,
    private ecommerceApiService: CommerceApiService,
    private productsService: ProductsService,
    private tokenStorageService: TokenStorageService,
    private notificationService: NotificationService,
    private store: Store<AppState>,
    private router: Router,
  ) {}

  loadAccsessToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAccsessToken, actions.loadRegistrationSuccess),
      filter((action) => !!action.accessData && !!action.accessData.email && !!action.accessData.password),
      mergeMap((action) => {
        const { email, password } = action.accessData;
        return this.ecommerceApiService.authentication(email, password).pipe(
          map((accessData: AuthData) => {
            this.tokenStorageService.saveAuthToken(accessData.refresh_token);
            this.tokenStorageService.removeAnonymousToken();
            this.notificationService.showNotification('success', 'You have successfully logged in');
            return actions.loadAccsessTokenSuccess({
              accessToken: accessData.access_token,
            });
          }),
          catchError((error) => {
            if (error.error.error === 'invalid_customer_account_credentials') {
              this.notificationService.showNotification('error', 'Incorrect email or password');
            }
            return of(
              actions.loadAccsessTokenFailure({
                error: error.message,
              }),
            );
          }),
        );
      }),
    ),
  );

  loadAnonymousToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAnonymousToken, actions.logoutSuccess),
      mergeMap(() => {
        return this.ecommerceApiService.getAnonymousSessionToken().pipe(
          map((data: AuthData) => {
            this.tokenStorageService.saveAnonymousToken(data.refresh_token);

            return actions.loadAnonymousTokenSuccess({
              anonymousToken: data.access_token,
            });
          }),
          catchError((error) =>
            of(
              actions.loadAnonymousTokenFailure({
                error: error.message,
              }),
            ),
          ),
        );
      }),
    ),
  );

  loadAnonymousCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAnonymousTokenSuccess),
      mergeMap((action) => {
        return this.ecommerceApiService.createAnonymousCart(action.anonymousToken).pipe(
          map((cartBase: CartBase) =>
            actions.loadAnonymousCartSuccess({
              cartBase,
            }),
          ),
          catchError((error) =>
            of(
              actions.loadAnonymousCartFailure({
                error: error.message,
              }),
            ),
          ),
        );
      }),
    ),
  );

  refreshAccsessToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.refreshAccsessToken),
      take(1),
      mergeMap((action) => {
        return this.ecommerceApiService.refreshAccessToken(action.refreshToken, action.basic).pipe(
          map((accessData: AuthData) =>
            actions.loadAccsessTokenSuccess({
              accessToken: accessData.access_token,
            }),
          ),
          catchError((error) => {
            if (error.error.error_description === 'The refresh token was not found. It may have expired.') {
              this.notificationService.showNotification('error', 'Refresh token expired');
            }
            return of(
              actions.loadAccsessTokenFailure({
                error: error.message,
              }),
            );
          }),
        );
      }),
    ),
  );

  refreshAnonRefreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateAnonymousToken),
      mergeMap((action) => {
        return this.ecommerceApiService.refreshAccessToken(action.refreshToken, action.basic).pipe(
          map((accessData: AuthData) =>
            actions.loadAnonymousTokenSuccess({
              anonymousToken: accessData.access_token,
            }),
          ),
          catchError((error) =>
            of(
              actions.loadAnonymousTokenFailure({
                error: error.message,
              }),
            ),
          ),
        );
      }),
    ),
  );

  loadRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadRegistration),
      switchMap((action) =>
        combineLatest([this.store.select(selectAnonymousToken), this.store.select(selectCartAnonId)]).pipe(
          filter(([anonToken, anonymousId]) => !!anonToken && !!anonymousId),
          take(1),
          switchMap(([anonToken, anonymousId]) =>
            this.ecommerceApiService.registration(action.customerDraft, anonToken, anonymousId).pipe(
              map(() => {
                this.notificationService.showNotification('success', 'Registration was successful!');
                return actions.loadRegistrationSuccess({
                  accessData: {
                    email: action.customerDraft.email,
                    password: action.customerDraft.password,
                  },
                });
              }),
              catchError((error) => {
                switch (error.error.errors[0].code) {
                  case 'DuplicateField':
                    this.notificationService.showNotification(
                      'error',
                      'Account with this email already exists. Please log in or try again with different email.',
                    );
                    break;
                  case 'OverCapacity':
                    this.notificationService.showNotification(
                      'warning',
                      'Service is currently unavailable due to high load. Please try again later.',
                    );
                    break;
                  case 'ExtensionBadResponse':
                    this.notificationService.showNotification('warning', 'Server-side problem, please try again later');
                    break;
                  default:
                    this.notificationService.showNotification('error', `An error occurred: ${error.error.message}`);
                    break;
                }
                return of(
                  actions.loadRegistrationFailure({
                    error: error.message,
                  }),
                );
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loadUpdateUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadUpdateUserInfo),
      withLatestFrom(this.store.pipe(select((state) => state.app.accessToken))),
      filter(([, accessToken]) => !!accessToken),
      switchMap(([action, accessToken]) =>
        this.ecommerceApiService.updatePersonalInfo(accessToken, action.userInfo.version, action.userInfo).pipe(
          map((response) => {
            this.notificationService.showNotification('success', 'Successfully updated personal information');
            return actions.loadUpdateUserInfoSuccess({ userInfo: <CustomerInfo>response });
          }),
          catchError((error) => of(actions.loadUpdateUserInfoFailure({ error }))),
        ),
      ),
    ),
  );

  loadUpdateUserAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadUpdateUserAddresses),
      withLatestFrom(this.store.select((state) => state.app.accessToken)),
      filter(([, accessToken]) => !!accessToken),
      exhaustMap(([action, accessToken]) =>
        this.ecommerceApiService
          .updateAddresses(accessToken, action.userInfo.version, action.userInfo, action.addresses)
          .pipe(
            map((response) => {
              this.notificationService.showNotification('success', 'Successfully updated addresses');
              return actions.loadUpdateUserAddressesSuccess({ userInfo: <CustomerInfo>response });
            }),

            catchError((error) => of(actions.loadUpdateUserAddressesFailure({ error }))),
          ),
      ),
    ),
  );

  loadUpdateUserPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadUpdateUserPassword),
      withLatestFrom(this.store.pipe(select((state) => state.app.accessToken))),
      filter(([, accessToken]) => !!accessToken),
      switchMap(([action, accessToken]) =>
        this.ecommerceApiService.updatePassword(accessToken, action.version, action.passwordData).pipe(
          map((response) => {
            this.store.dispatch(actions.logout());
            this.router.navigateByUrl('/login');
            this.notificationService.showNotification('success', 'Successfully updated password, please relogin');
            return actions.loadUpdateUserInfoSuccess({ userInfo: response });
          }),
          catchError((error) => {
            if (error.error.errors[0].code === 'InvalidCurrentPassword')
              this.notificationService.showNotification('error', 'The given current password does not match.');
            else {
              this.notificationService.showNotification('error', 'An error occured when trying to change password');
            }
            return of(actions.loadUpdateUserInfoFailure({ error }));
          }),
        ),
      ),
    ),
  );

  loadUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAccsessTokenSuccess),
      switchMap((action) =>
        this.ecommerceApiService.getUserInfo(action.accessToken).pipe(
          map((userInfo) => actions.loadUserInfoSuccess({ userInfo })),
          catchError((error) => of(actions.loadUserInfoFailure({ error }))),
        ),
      ),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.logout),
      tap(() => {
        this.tokenStorageService.removeAuthToken();
        this.tokenStorageService.removeAnonymousToken();
      }),
      mergeMap(() => of(actions.logoutSuccess())),
    ),
  );

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadProducts),
      switchMap((action) =>
        combineLatest([this.store.select(selectAnonymousToken), this.store.select(selectAccessToken)]).pipe(
          filter(([anonToken, accessToken]) => !!anonToken || !!accessToken),
          take(1),
          switchMap(([anonToken, accessToken]) =>
            this.productsService.getProducts(accessToken || anonToken, action.offset, action.limit).pipe(
              map((products: ProductsArray) =>
                actions.loadProductsSuccess({
                  products,
                }),
              ),
              catchError((error) =>
                of(
                  actions.loadProductsFailure({
                    error: error.message,
                  }),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );

  loadProductId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadProductId),
      switchMap((action) =>
        combineLatest([this.store.select(selectAnonymousToken), this.store.select(selectAccessToken)]).pipe(
          filter(([anonToken, accessToken]) => !!anonToken || !!accessToken),
          take(1),
          switchMap(([anonToken, accessToken]) =>
            this.productsService.getProductById(action.id, accessToken || anonToken).pipe(
              map((product: Product) => actions.loadProductIdSuccess({ product })),
              catchError((error) => {
                this.router.navigate(['/catalog']);
                this.notificationService.showNotification(
                  'error',
                  `${error.error.statusCode}: The Product was not found`,
                );
                return of(
                  actions.loadProductIdFailure({
                    error: error.message,
                  }),
                );
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadCategories),
      switchMap((action) =>
        combineLatest([this.store.select(selectAnonymousToken), this.store.select(selectAccessToken)]).pipe(
          filter(([anonToken, accessToken]) => !!anonToken || !!accessToken),
          take(1),
          switchMap(([anonToken, accessToken]) =>
            this.productsService.getCategories(accessToken || anonToken, action.offset, action.limit).pipe(
              map((categories: CategoriesArray) => actions.loadCategoriesSuccess({ categories })),
              catchError((error) => of(actions.loadCategoriesFailure({ error: error.message }))),
            ),
          ),
        ),
      ),
    ),
  );

  prepareProducts(products: ProductProjectionArray): ProductsArray {
    if (products) {
      const productsArray: ProductsArray = {
        limit: products.limit,
        count: products.count,
        total: products.total,
        offset: products.offset,
        results: [],
      };

      products.results.forEach((card) => {
        productsArray.results.push({
          id: card.id,
          masterData: {
            current: card,
          },
        });
      });

      return productsArray;
    }
    return products;
  }

  loadFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadFilter),
      switchMap((action) =>
        combineLatest([this.store.select(selectAnonymousToken), this.store.select(selectAccessToken)]).pipe(
          filter(([anonToken, accessToken]) => !!anonToken || !!accessToken),
          take(1),
          switchMap(([anonToken, accessToken]) =>
            this.productsService
              .filterProducts(
                accessToken || anonToken,
                action.searchText,
                action.filters,
                action.sort,
                action.offset,
                action.limit,
              )
              .pipe(
                map((products: ProductProjectionArray) =>
                  actions.loadFilterSuccess({ products: this.prepareProducts(products) }),
                ),
                catchError((error) => of(actions.loadFilterFailure({ error: error.message }))),
              ),
          ),
        ),
      ),
    ),
  );
}
