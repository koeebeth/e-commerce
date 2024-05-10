import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { AuthData } from './apitypes';
import { TokenStorageService } from '../tokenStorage/tokenstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ctpAuthUrl = environment.ctpAuthUrl;
  private projectKey = environment.ctpProjectKey;
  private authUrl = `${this.ctpAuthUrl}/oauth/${this.projectKey}/customers/token`;
  private clientId = environment.ctpClientId;
  private clientSecret = environment.ctpClientSecret;
  private scopes = environment.ctpScopes;

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
  ) {}

  authentication(username: string, password: string): Observable<AuthData> {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);
    body.set('scope', this.scopes);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`);

    return this.http.post(this.authUrl, body.toString(), { headers }) as Observable<AuthData>;
  }

  isAuthorized() {
    const username = 'test@mail.com';
    const userPassword = 'password0987654321';

    this.authentication(username, userPassword).subscribe({
      next: (data) => {
        console.log('Authentication data:', data);
        if (data && data.access_token) {
          this.tokenStorageService.saveToken(data.access_token);
        }
      },
      error: (error) => {
        console.error('Authentication error:', error);
      },
    });
  }
}
