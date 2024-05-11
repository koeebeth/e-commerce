import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { authVisitorAPI, unauthVisitorAPI } from '../../../../environment';
import { AuthData, CustomerDraft } from './apitypes';
import TokenStorageService from '../tokenStorage/tokenstorage.service';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
  ) {}

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
      console.log('Refresh token is not available. Get anonymous session token');
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
      },
    });
  }
}
