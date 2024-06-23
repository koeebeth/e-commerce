import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { unauthVisitorAPI, authVisitorAPI } from '../../../../environment';
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

  createUserCart(accessToken: string): Observable<CartBase> {
    const apiUrl = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/me/carts`;

    const body = {
      currency: 'USD',
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<CartBase>(apiUrl, JSON.stringify(body), { headers });
  }

  getUserCart(accessToken: string): Observable<HttpResponse<CartBase>> {
    const apiUrl = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/me/active-cart`;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<CartBase>(apiUrl, { headers, observe: 'response' });
  }

  updateAnonymousCart(
    accessToken: string,
    idCart: string,
    version: number,
    action: 'add' | 'remove' | 'change-quantity',
    productId?: string,
    lineItemId?: string,
    quantity?: number,
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

    if (action === 'change-quantity') {
      requestActions.push({
        action: 'changeLineItemQuantity',
        lineItemId,
        quantity,
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
}
