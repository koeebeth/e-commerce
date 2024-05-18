import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, take } from 'rxjs';
import CommerceApiService from '../shared/services/commercetoolsApi/commercetoolsapi.service';
import { AuthData, CartBase } from '../shared/services/commercetoolsApi/apitypes';
import * as actions from './actions';
import { Router } from '@angular/router';
import TokenStorageService from '../shared/services/tokenStorage/tokenstorage.service';

@Injectable()
export class EcommerceEffects {
  constructor(
    private actions$: Actions,
    private ecommerceApiService: CommerceApiService,
    private tokenStorageService: TokenStorageService,
    private route: Router,
  ) {}

  loadAccsessToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAccsessToken),
      take(1),
      mergeMap((action) => {
        const { email, password } = action.accessData;
        return this.ecommerceApiService.authentication(email, password).pipe(
          map((accessData: AuthData) => {
            this.tokenStorageService.saveAuthToken(accessData.refresh_token);
            this.tokenStorageService.removeAnonymousToken();

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
  // works
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
  // works
  loadAnonymousCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAnonymousTokenSuccess),
      take(1),
      mergeMap((action) => {
        console.log('action', action);
        return this.ecommerceApiService.createAnonymousCart(action.anonymousToken).pipe(
          map((cartBase: CartBase) =>
            actions.loadAnonymousCartSuccess({
              cartBase: cartBase,
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
  // works
  updateAccsessToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateAccsessToken),
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

  refresAnonToken$ = createEffect(() =>
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
}
