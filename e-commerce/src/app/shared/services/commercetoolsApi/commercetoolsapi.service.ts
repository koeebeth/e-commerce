import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, mergeMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { authVisitorAPI, unauthVisitorAPI } from '../../../../environment';
import { Address, AuthData, CartBase, CustomerDraft, CustomerInfo, PasswordChange, PersonalInfo } from './apitypes';
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
  }

  createUserCart(accessToken: string): Observable<CartBase> {
    const apiUrl = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/carts`;

    const body = {
      currency: 'USD',
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<CartBase>(apiUrl, body, { headers });
  }

  getUserCart(accessToken: string, userId: string): Observable<CartBase> {
    const apiUrl = `${unauthVisitorAPI.ctpApiUrl}/${unauthVisitorAPI.ctpProjectKey}/carts/customer-id=${userId}`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<CartBase>(apiUrl, { headers });
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
      defaultShippingAddress: customerDraft.defaultShippingAddress,
      defaultBillingAddress: customerDraft.defaultBillingAddress,
      shippingAddresses: customerDraft.shippingAddresses,
      billingAddresses: customerDraft.billingAddresses,
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

  getUserInfo(accessToken: string) {
    const requestUrl = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/me`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<CustomerInfo>(requestUrl, { headers });
  }

  updatePersonalInfo(accessToken: string, version: number, data: PersonalInfo) {
    const requestUrl = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/me`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    const body = {
      version,
      actions: [
        {
          action: 'changeEmail',
          email: data.email,
        },
        {
          action: 'setFirstName',
          firstName: data.firstName,
        },
        {
          action: 'setLastName',
          lastName: data.lastName,
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth: data.dateOfBirth,
        },
      ],
    };

    return this.http.post<PersonalInfo>(requestUrl, JSON.stringify(body), { headers });
  }

  updateAddresses(
    accessToken: string,
    version: number,
    currentUser: CustomerInfo,
    addresses: (Address & { key: string; type: 'billing' | 'shipping'; default: boolean })[],
  ) {
    const requestUrl = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/me`;
    const currentAddresses = currentUser.addresses;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    const requestActions: object[] = [];
    const addIdActions: object[] = [];

    addresses.forEach((address) => {
      const { city, country, postalCode, streetNumber } = address;
      const addressInfo = { city, country, postalCode, streetNumber };
      if (currentAddresses.find((a) => a.id === address.id)) {
        requestActions.push({
          action: 'changeAddress',
          addressId: address.id,
          address: addressInfo,
        });

        if (address.default && address.type === 'billing') {
          requestActions.push({
            action: 'setDefaultBillingAddress',
            addressId: address.id,
          });
        } else if (address.default && address.type === 'shipping') {
          requestActions.push({
            action: 'setDefaultShippingAddress',
            addressId: address.id,
          });
        }
      } else {
        requestActions.push({
          action: 'addAddress',
          address,
        });
        if (address.type === 'billing') {
          addIdActions.push({
            action: 'addBillingAddressId',
            addressKey: address.key,
          });

          if (address.default) {
            addIdActions.push({
              action: 'setDefaultBillingAddress',
              addressKey: address.key,
            });
          }
        } else {
          addIdActions.push({
            action: 'addShippingAddressId',
            addressKey: address.key,
          });

          if (address.default) {
            addIdActions.push({
              action: 'setDefaultShippingAddress',
              addressKey: address.key,
            });
          }
        }
      }
    });

    currentAddresses.forEach((address) => {
      if (!addresses.find((a) => a.id === address.id)) {
        requestActions.push({
          action: 'removeAddress',
          addressId: address.id,
        });
      }
    });

    const body = {
      version,
      actions: requestActions,
    };

    return this.http.post<CustomerInfo>(requestUrl, JSON.stringify(body), { headers }).pipe(
      mergeMap((res) => {
        return this.http.post<CustomerInfo>(
          requestUrl,
          JSON.stringify({ version: res.version, actions: addIdActions }),
          {
            headers,
          },
        );
      }),
    );
  }

  updatePassword(accessToken: string, version: number, data: PasswordChange) {
    const requestUrl = `${authVisitorAPI.ctpApiUrl}/${authVisitorAPI.ctpProjectKey}/me/password`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    const body = {
      version,
      ...data,
    };

    return this.http.post<CustomerInfo>(requestUrl, JSON.stringify(body), { headers });
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
