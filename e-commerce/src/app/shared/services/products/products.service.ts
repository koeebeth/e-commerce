import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authVisitorAPI } from '../../../../environment';
import { CategoriesArray, Product, ProductProjectionArray, ProductsArray } from './productTypes';

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
    filters?: { [key: string]: string[] },
    sort?: string,
    offset: number = 0,
    limit: number = 10,
  ): Observable<ProductProjectionArray> {
    const url = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/product-projections/search`;

    let params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    if (sort) {
      params = params.set('sort:', sort);
    }

    if (filters) {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          filters[key].forEach((value) => {
            params = params.append('filter', `${key}:"${value}"`);
          });
        }
      }
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<ProductProjectionArray>(url, { headers, params });
  }
}
