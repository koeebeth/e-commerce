import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class TokenStorageService {
  getAuthToken(): string | null {
    return localStorage.getItem(`AuthRefresh`);
  }

  saveAuthToken(authToken: string): void {
    localStorage.setItem(`AuthRefresh`, authToken);
  }

  removeAuthToken(): void {
    localStorage.removeItem(`AuthRefresh`);
  }

  getAnonymousToken(): string | null {
    return localStorage.getItem(`AnonymousRefresh`);
  }

  saveAnonymousToken(anonToken: string): void {
    localStorage.setItem(`AnonymousRefresh`, anonToken);
  }

  removeAnonymousToken(): void {
    localStorage.removeItem(`AnonymousRefresh`);
  }
}
