import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, take } from 'rxjs';
import CommerceApiService from '../shared/services/commercetoolsApi/commercetoolsapi.service';
import { AuthData } from '../shared/services/commercetoolsApi/apitypes';
import * as actions from './actions';

@Injectable()
export class EcommerceEffects {
  loadAccsessToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAccsessToken),
      take(1),
      mergeMap((action) => {
        const { email, password } = action.data;
        return this.ecommerceApiService.authentication(email, password).pipe(
          map((data: AuthData) => actions.loadAccsessTokenSuccess({ token: data.access_token })),
          catchError((error) => of(actions.loadAccsessTokenFailure({ error: error.message }))),
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
          map((data: AuthData) => actions.loadAnonymousTokenSuccess({ token: data.access_token })),
          catchError((error) => of(actions.loadAnonymousTokenFailure({ error: error.message }))),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private ecommerceApiService: CommerceApiService,
  ) {}
}
