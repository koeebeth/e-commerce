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

  getProductById(productId: string, token: string): Observable<Product> {
    const url = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/products/${productId}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`);

    return this.http.get<Product>(url, { headers });
  }

  searchProducts(
    searchText: string,
    token: string,
    offset: number,
    limit: number,
  ): Observable<ProductPagedQueryResponse> {
    const url = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/product-projections/search`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const params = new HttpParams()
      .set('text.en', searchText)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get<ProductPagedQueryResponse>(url, { headers, params });
  }
}
