import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, take } from 'rxjs';
import CommerceApiService from '../shared/services/commercetoolsApi/commercetoolsapi.service';
import { AuthData, CartBase } from '../shared/services/commercetoolsApi/apitypes';
import * as actions from './actions';

@Injectable()
export class EcommerceEffects {
  constructor(
    private actions$: Actions,
    private ecommerceApiService: CommerceApiService,
  ) {}

  loadAccsessToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAccsessToken),
      take(1),
      mergeMap((action) => {
        const { email, password } = action.accessData;
        return this.ecommerceApiService.authentication(email, password).pipe(
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

  loadAnonymousToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAnonymousToken),
      take(1),
      mergeMap(() => {
        return this.ecommerceApiService.getAnonymousSessionToken().pipe(
          map((data: AuthData) =>
            actions.loadAnonymousTokenSuccess({
              anonymousToken: data.access_token,
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

  loadAnonymousId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAnonymousTokenSuccess),
      take(1),
      mergeMap((action) => {
        console.log('action', action);
        return this.ecommerceApiService.createAnonymousCart(action.anonymousToken).pipe(
          map((cartBase: CartBase) =>
            actions.loadAnonymousIdSuccess({
              cartBase: cartBase,
            }),
          ),
          catchError((error) =>
            of(
              actions.loadAnonymousIdFailure({
                error: error.message,
              }),
            ),
          ),
        );
      }),
    ),
  );
}
