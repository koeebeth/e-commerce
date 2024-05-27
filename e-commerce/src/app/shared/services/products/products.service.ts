import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authVisitorAPI } from '../../../../environment';
import { Observable, switchMap, take } from 'rxjs';
import { AppState } from '../../../store/store';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../../../store/selectors';
import { Product } from './productTypes';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  accessToken$!: Observable<string>;
  tokenStorageService: any;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) {}

  getProducts(accessToken: string, limit: number = 20, offset: number = 0): Observable<Product[]> {
    const url = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/products`;

    let params = new HttpParams();
    params = params.append('limit', limit.toString());
    params = params.append('offset', offset.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<Product[]>(url, { headers, params });
  }
}
