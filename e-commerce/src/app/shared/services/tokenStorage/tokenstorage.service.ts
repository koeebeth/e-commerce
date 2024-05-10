import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private namespace = 'user';

  constructor() {}

  getToken(): string | null {
    return localStorage.getItem(`${this.namespace}_token`);
  }

  saveToken(token: string): void {
    localStorage.setItem(`${this.namespace}_token`, token);
  }

  removeToken(): void {
    localStorage.removeItem(`${this.namespace}_token`);
  }
}
