import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authVisitorAPI } from '../../../../environment';
import { Product, ProductPagedQueryResponse } from './productTypes';

@Injectable({
  providedIn: 'root',
})
export default class ProductsService {
  accessToken$!: Observable<string>;

  anonToken$!: Observable<string>;

  constructor(private http: HttpClient) {}

  getProducts(token: string, offset: number, limit: number = 10): Observable<ProductPagedQueryResponse> {
    const url = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/products`;

    const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<ProductPagedQueryResponse>(url, { headers, params });
  }

  getProductById(productId: string, accessToken: string): Observable<Product> {
    const url = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/products/${productId}`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<Product>(url, { headers });
  }
}
