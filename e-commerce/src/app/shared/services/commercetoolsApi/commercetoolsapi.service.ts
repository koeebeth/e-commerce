import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { authVisitorAPI, unauthVisitorAPI } from '../../../../environment';
import { AuthData, CartBase, CustomerDraft } from './apitypes';
import TokenStorageService from '../tokenStorage/tokenstorage.service';
import * as actions from '../../../store/actions';
import { AppState } from '../../../store/store';

@Injectable({
  providedIn: 'root',
})
export default class CommerceApiService {
  anonToken$!: Observable<string>;

  anonymousId$!: Observable<string | undefined>;

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private store: Store<AppState>,
  ) {}

  getAnonymousSessionToken(): Observable<AuthData> {
    const unAuthUrl = `${unauthVisitorAPI.ctpAuthUrl}/oauth/${unauthVisitorAPI.ctpProjectKey}/anonymous/token`;
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('scope', unauthVisitorAPI.ctpScopes);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Basic ${btoa(`${unauthVisitorAPI.ctpClientId}:${unauthVisitorAPI.ctpClientSecret}`)}`);

    return this.http.post<AuthData>(unAuthUrl, body.toString(), { headers });
    // Annonymous access_token saved in store
  }

  createAnonymousCart(accessToken: string): Observable<CartBase> {
    const apiUrl = `${unauthVisitorAPI.ctpApiUrl}/${unauthVisitorAPI.ctpProjectKey}/me/carts`;

    const body = {
      currency: 'USD',
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<CartBase>(apiUrl, body, { headers });
    // anonymousId saved in store
  }

  registration(customerDraft: CustomerDraft, anonToken: string, anonymousId: string = ''): Observable<CustomerDraft> {
    const apiUrl = `${unauthVisitorAPI.ctpApiUrl}/${unauthVisitorAPI.ctpProjectKey}/customers`;
    const body = {
      email: customerDraft.email,
      password: customerDraft.password,
      firstName: customerDraft.firstName,
      lastName: customerDraft.lastName,
      dateOfBirth: customerDraft.dateOfBirth,
      addresses: customerDraft.addresses,
      anonymousId,
      defaultShippingAddressId: customerDraft.defaultShippingAddressId,
      defaultBillingAddressId: customerDraft.defaultBillingAddressId,
    };
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${anonToken}`);

    return this.http.post<CustomerDraft>(apiUrl, body, { headers });
  }

  authentication(username: string, password: string): Observable<AuthData> {
    const authUrl = `${authVisitorAPI.ctpAuthUrl}/oauth/${authVisitorAPI.ctpProjectKey}/customers/token`;

    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);
    body.set('scope', authVisitorAPI.ctpScopes);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Basic ${btoa(`${authVisitorAPI.ctpClientId}:${authVisitorAPI.ctpClientSecret}`)}`);

    return this.http.post<AuthData>(authUrl, body.toString(), { headers });
  }

  checkTokens(): void {
    const refreshToken = this.tokenStorageService.getAuthToken();
    const refreshAnonymousToken = this.tokenStorageService.getAnonymousToken();

    if (!refreshToken && !refreshAnonymousToken) {
      this.store.dispatch(actions.loadAnonymousToken());
    }

    if (refreshToken) {
      const basic = `Basic ${btoa(`${authVisitorAPI.ctpClientId}:${authVisitorAPI.ctpClientSecret}`)}`;
      this.store.dispatch(actions.refreshAccsessToken({ refreshToken, basic }));
    } else if (refreshAnonymousToken) {
      const basic = `Basic ${btoa(`${unauthVisitorAPI.ctpClientId}:${unauthVisitorAPI.ctpClientSecret}`)}`;
      this.store.dispatch(actions.updateAnonymousToken({ refreshToken: refreshAnonymousToken, basic }));
    }
  }

  refreshAccessToken(refreshToken: string, basic: string): Observable<AuthData> {
    const authUrl = `${authVisitorAPI.ctpAuthUrl}/oauth/token`;
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', refreshToken);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', basic);

    return this.http.post<AuthData>(authUrl, body.toString(), { headers });
  }
}
