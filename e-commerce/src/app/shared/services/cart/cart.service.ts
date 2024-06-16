import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { unauthVisitorAPI } from '../../../../environment';
import { CartBase } from '../commercetoolsApi/apitypes';

@Injectable({
  providedIn: 'root',
})
export default class CartService {
  anonToken$!: Observable<string>;

  anonymousId$!: Observable<string | undefined>;

  constructor(private http: HttpClient) {}

  createAnonymousCart(accessToken: string): Observable<CartBase> {
    const apiUrl = `${unauthVisitorAPI.ctpApiUrl}/${unauthVisitorAPI.ctpProjectKey}/me/carts`;

    const body = {
      currency: 'USD',
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<CartBase>(apiUrl, body, { headers });
  }

  updateAnonymousCart(
    accessToken: string,
    idCart: string,
    version: number,
    action: 'add' | 'remove',
    productId?: string,
    lineItemId?: string,
  ): Observable<CartBase> {
    const apiUrl = `${unauthVisitorAPI.ctpApiUrl}/${unauthVisitorAPI.ctpProjectKey}/me/carts/${idCart}`;

    const requestActions: object[] = [];

    if (action === 'add') {
      requestActions.push(
        {
          action: 'setCountry',
          country: 'US',
        },
        {
          action: 'addLineItem',
          productId,
          quantity: 1,
        },
      );
    }

    if (action === 'remove') {
      requestActions.push({
        action: 'removeLineItem',
        lineItemId,
      });
    }

    const body = {
      version,
      actions: requestActions,
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<CartBase>(apiUrl, body, { headers });
  }

  deleteCart(accessToken: string, idCart: string, version: number): Observable<CartBase> {
    const apiUrl = `${unauthVisitorAPI.ctpApiUrl}/${unauthVisitorAPI.ctpProjectKey}/me/carts/${idCart}?version=${version}`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.delete<CartBase>(apiUrl, { headers });
  }

  deleteAndCreateCart(accessToken: string, cartId: string, cartVersion: number): Observable<CartBase> {
    return this.deleteCart(accessToken, cartId, cartVersion).pipe(
      switchMap(() => this.createAnonymousCart(accessToken)),
    );
  }
}
