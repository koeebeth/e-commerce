import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { authVisitorAPI, unauthVisitorAPI } from '../../../../environment';
import { AuthData, CartBase, CustomerDraft } from './apitypes';
import { Router } from '@angular/router';
import TokenStorageService from '../tokenStorage/tokenstorage.service';

@Injectable({
  providedIn: 'root',
})
export default class CommerceApiService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private route: Router,
  ) {}

  // Token for a customer which might, at some point, log in or sign up
  getAnonymousSessionToken(): void {
    const unAuthUrl = `${unauthVisitorAPI.ctpAuthUrl}/oauth/${unauthVisitorAPI.ctpProjectKey}/anonymous/token`;
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('scope', unauthVisitorAPI.ctpScopes);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Basic ${btoa(`${unauthVisitorAPI.ctpClientId}:${unauthVisitorAPI.ctpClientSecret}`)}`);

    (this.http.post(unAuthUrl, body.toString(), { headers }) as Observable<AuthData>).subscribe({
      next: (response) => {
        console.log('Anonymous Session Token:', response);
        console.log('Annonymous token response.access_token should be saved to state to a separete field!');
        this.tokenStorageService.saveToken(response.access_token);
        this.createAnonymousCart(response.access_token);
      },
      error: (error) => {
        console.error('Error fetching Anonymous Session Token:', error);
      },
    });
  }

  createAnonymousCart(accessToken: string): void {
    const apiUrl = `${unauthVisitorAPI.ctpApiUrl}/${unauthVisitorAPI.ctpProjectKey}/me/carts`;

    const body = {
      currency: 'USD',
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    (this.http.post(apiUrl, body, { headers }) as Observable<CartBase>).subscribe({
      next: (response) => {
        console.log('Anonymous Cart:', response);
        console.log('save anonymousId in state service', response.anonymousId);
      },
      error: (error) => {
        console.error('Error creating Anonymous Cart:', error);
      },
    });
  }

  registration(customerDraft: CustomerDraft, anonymousToken: string, anonymousId: string): void {
    const apiUrl = `${unauthVisitorAPI.ctpApiUrl}/${unauthVisitorAPI.ctpProjectKey}/customers`;
    const body = {
      email: customerDraft.email,
      password: customerDraft.password,
      firstName: customerDraft.firstName,
      lastName: customerDraft.lastName,
      dateOfBirth: customerDraft.dateOfBirth,
      addresses: customerDraft.addresses,
      anonymousCartId: anonymousId,
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${anonymousToken}`);

    (this.http.post(apiUrl, body, { headers }) as Observable<CustomerDraft>).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.authentication(customerDraft.email, customerDraft.password);
      },
      error: (error) => {
        console.error('Registration error:', error.message);
      },
    });
  }

  authentication(username: string, password: string): void {
    const authUrl = `${authVisitorAPI.ctpAuthUrl}/oauth/${authVisitorAPI.ctpProjectKey}/customers/token`;

    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);
    body.set('scope', authVisitorAPI.ctpScopes);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Basic ${btoa(`${authVisitorAPI.ctpClientId}:${authVisitorAPI.ctpClientSecret}`)}`);

    (this.http.post(authUrl, body.toString(), { headers }) as Observable<AuthData>).subscribe({
      next: (data) => {
        if (data && data.refresh_token) {
          this.tokenStorageService.saveToken(data.refresh_token);
          console.log('Save accsessToken to state');
          this.route.navigate(['/main']);
        }
      },
      error: (error) => {
        console.error('Authentication error:', error);
      },
    });
  }

  refreshAccessToken(): void {
    const refreshToken = this.tokenStorageService.getToken();
    const authUrl = `${authVisitorAPI.ctpAuthUrl}/oauth/token`;

    if (!refreshToken) {
      this.getAnonymousSessionToken();
      console.log('User isnt logged in. Get anonymous session token');
      return;
    }

    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', refreshToken);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Basic ${btoa(`${authVisitorAPI.ctpClientId}:${authVisitorAPI.ctpClientSecret}`)}`);

    (this.http.post(authUrl, body.toString(), { headers }) as Observable<AuthData>).subscribe({
      next: (data) => {
        if (data) {
          console.log('Save accsessToken to state');
        }
      },
      error: (error) => {
        console.error('Authentication error:', error);
        this.getAnonymousSessionToken();
      },
    });
  }
}
