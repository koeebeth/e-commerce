import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, take, combineLatest, switchMap, filter, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import CommerceApiService from '../shared/services/commercetoolsApi/commercetoolsapi.service';
import { AuthData, CartBase } from '../shared/services/commercetoolsApi/apitypes';
import * as actions from './actions';
import TokenStorageService from '../shared/services/tokenStorage/tokenstorage.service';
import { AppState } from './store';
import { selectAnonymousToken, selectCartAnonId } from './selectors';
import { NotificationService } from '../shared/services/notification/notification.service';

@Injectable()
export default class EcommerceEffects {
  constructor(
    private actions$: Actions,
    private ecommerceApiService: CommerceApiService,
    private tokenStorageService: TokenStorageService,
    private notificationService: NotificationService,
    private store: Store<AppState>,
    private router: Router,
  ) {}

  loadAccsessToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAccsessToken, actions.loadRegistrationSuccess),
      filter((action) => !!action.accessData.email && !!action.accessData.password),
      mergeMap((action) => {
        const { email, password } = action.accessData;
        return this.ecommerceApiService.authentication(email, password).pipe(
          map((accessData: AuthData) => {
            this.tokenStorageService.saveAuthToken(accessData.refresh_token);
            this.tokenStorageService.removeAnonymousToken();
            if (this.router.url === '/registration' || this.router.url === '/login') {
              this.router.navigate(['/main']);
            }
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
          catchError((error) =>
            of(
              actions.loadAccsessTokenFailure({
                error: error.message,
              }),
            ),
          ),
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

  loadUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAccsessTokenSuccess), // Trigger loading user data only after successful authentication
      switchMap(() =>
        this.ecommerceApiService.getUserInfo().pipe(
          map((user) => actions.loadUserInfoSuccess({ user })),
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
}
