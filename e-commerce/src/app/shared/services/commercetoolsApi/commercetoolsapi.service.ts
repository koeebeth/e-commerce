import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { authVisitorAPI, unauthVisitorAPI } from '../../../../environment';
import { AuthData, CustomerDraft } from './apitypes';
import TokenStorageService from '../tokenStorage/tokenstorage.service';

@Injectable({
  providedIn: 'root',
})
export default class CommerceApiService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
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
        console.log('Annonymous token response.access_token should be saved to stage to a separete field!');
      },
      error: (error) => {
        console.error('Error fetching Anonymous Session Token:', error);
      },
    });
  }

  registration(customerDraft: CustomerDraft, anonymousToken: string): void {
    const apiUrl  = `${unauthVisitorAPI.ctpApiUrl}/${unauthVisitorAPI.ctpProjectKey}/customers`;
    const body = {
      email: customerDraft.email,
      password: customerDraft.password,
      firstName: customerDraft.firstName,
      lastName: customerDraft.lastName,
    };
  
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${anonymousToken}`);
  
    (this.http.post(apiUrl, body, { headers }) as Observable<CustomerDraft>)
      .subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.authentication(customerDraft.email, customerDraft.password);
          console.log('Redirect to the home page');
        },
        error: (error) => {
          console.error('Registration error:', error.message);
        },
      })
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
          console.log('Save accsessToken to stage');
          console.log('Redirect to the home page');
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
          console.log('Save accsessToken to stage');
        }
      },
      error: (error) => {
        console.error('Authentication error:', error);
        this.getAnonymousSessionToken();
      },
    });
  }
}
