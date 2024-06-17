import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authVisitorAPI } from '../../../../environment';
import { CategoriesArray, DiscountCode, Product, ProductProjectionArray, ProductsArray } from './productTypes';
import { CartBase } from '../commercetoolsApi/apitypes';

@Injectable({
  providedIn: 'root',
})
export default class ProductsService {
  accessToken$!: Observable<string>;

  anonToken$!: Observable<string>;

  constructor(private http: HttpClient) {}

  getProducts(token: string, offset: number, limit: number = 10): Observable<ProductsArray> {
    const url = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/products`;

    const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<ProductsArray>(url, { headers, params });
  }

  getProductById(productId: string, token: string): Observable<Product> {
    const url = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/products/${productId}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`);

    return this.http.get<Product>(url, { headers });
  }

  getCategories(token: string, offset: number, limit: number): Observable<CategoriesArray> {
    const url = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/categories`;

    const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<CategoriesArray>(url, { headers, params });
  }

  filterProducts(
    token: string,
    searchText?: string,
    filters?: { [key: string]: string[] },
    sort?: string,
    offset: number = 0,
    limit: number = 10,
  ): Observable<ProductProjectionArray> {
    const url = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/product-projections/search`;

    let params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    if (sort) {
      params = params.set('sort', sort);
    }

    if (filters) {
      Object.keys(filters).forEach((key) => {
        filters[key].forEach((value) => {
          let filterValue = value;
          if (key === 'categories.id') {
            filterValue = `"${value}"`;
          }
          params = params.append('filter', `${key}:${filterValue}`);
        });
      });
    }

    if (searchText) {
      params = params.append('text.en-US', searchText).set('fuzzy', 'true');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<ProductProjectionArray>(url, { headers, params });
  }

  manageDiscountCode(
    cartId: string,
    actionType: 'add' | 'remove',
    discountCodeId: string,
    cartVersion: number,
    accessToken: string,
  ): Observable<DiscountCode> {
    const url = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/carts/${cartId}`;
    let actions: object[] = [];

    if (actionType === 'add') {
      actions.push({
        action: 'addDiscountCode',
        code: discountCodeId,
      });
    } else if (actionType === 'remove') {
      actions.push({
        action: 'removeDiscountCode',
        discountCode: {
          id: discountCodeId,
        },
      });
    }

    const body = {
      version: cartVersion,
      actions: actions,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.post<DiscountCode>(url, body, { headers });
  }
}
