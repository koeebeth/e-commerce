import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, take, combineLatest, switchMap, filter } from 'rxjs';
import { Store } from '@ngrx/store';
import CommerceApiService from '../shared/services/commercetoolsApi/commercetoolsapi.service';
import { AuthData, CartBase } from '../shared/services/commercetoolsApi/apitypes';
import * as actions from './actions';
import TokenStorageService from '../shared/services/tokenStorage/tokenstorage.service';
import { AppState } from './store';
import { selectAnonymousToken, selectCartAnonId } from './selectors';
import { Router } from '@angular/router';

@Injectable()
export default class EcommerceEffects {
  constructor(
    private actions$: Actions,
    private ecommerceApiService: CommerceApiService,
    private tokenStorageService: TokenStorageService,
    private store: Store<AppState>,
    private router: Router,
  ) {}

  loadAccsessToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAccsessToken, actions.loadRegistrationSuccess),
      filter((action) => !!action.accessData.email && !!action.accessData.password),
      take(1),
      mergeMap((action) => {
        const { email, password } = action.accessData;
        return this.ecommerceApiService.authentication(email, password).pipe(
          map((accessData: AuthData) => {
            this.tokenStorageService.saveAuthToken(accessData.refresh_token);
            this.tokenStorageService.removeAnonymousToken();
            if (this.router.url === '/registration' || this.router.url === '/login') {
              this.router.navigate(['/main']);
            }
            return actions.loadAccsessTokenSuccess({
              accessToken: accessData.access_token,
            });
          }),
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

  loadAnonymousToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAnonymousToken),
      take(1),
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
      take(1),
      mergeMap((action) => {
        console.log('action', action);
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
      take(1),
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
          filter(([anonToken]) => !!anonToken),
          take(1),
          switchMap(([anonToken, anonymousId]) =>
            this.ecommerceApiService.registration(action.customerDraft, anonToken, anonymousId).pipe(
              map(() =>
                actions.loadRegistrationSuccess({
                  accessData: {
                    email: action.customerDraft.email,
                    password: action.customerDraft.password,
                  },
                }),
              ),
              catchError((error) =>
                of(
                  actions.loadRegistrationFailure({
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
}
