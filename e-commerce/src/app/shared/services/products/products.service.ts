import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authVisitorAPI } from '../../../../environment';
import { Observable, switchMap, take } from 'rxjs';
import { AppState } from '../../../store/store';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../../../store/selectors';
import { Product, ProductPagedQueryResponse } from './productTypes';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  accessToken$!: Observable<string>;
  anonToken$!: Observable<string>;
  tokenStorageService: any;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) {}

  getProducts(token: string, offset: number, limit: number = 10): Observable<ProductPagedQueryResponse> {
    const url = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/products`;

    let params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<ProductPagedQueryResponse>(url, { headers, params });
  }

  getProductById(productId: string, accessToken: string): Observable<any> {
    const url = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/products/${productId}`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.get(url, { headers });
  }
}
