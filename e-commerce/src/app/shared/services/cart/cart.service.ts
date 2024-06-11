import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  updateAnonymousCart(accessToken: string, idCart: string, version: number, productId: string): Observable<CartBase> {
    const apiUrl = `${unauthVisitorAPI.ctpApiUrl}/${unauthVisitorAPI.ctpProjectKey}/me/carts/${idCart}`;

    const body = {
      version,
      actions: [
        {
          action: 'setCountry',
          country: 'US',
        },
        {
          action: 'addLineItem',
          productId,
          quantity: 1,
        },
      ],
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<CartBase>(apiUrl, body, { headers });
  }
}
