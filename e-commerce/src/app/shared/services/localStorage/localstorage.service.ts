import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class LocalStorageService {
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

  saveCartId(cartId: string): void {
    localStorage.setItem('Cart ID', cartId);
  }

  getCartId(): string | null {
    return localStorage.getItem('Cart ID');
  }

  savePromoCode(promo: string): void {
    localStorage.setItem('Promo Code', promo);
  }

  getPromoCode(): string | null {
    return localStorage.getItem('Promo Code');
  }

  clearPromoCode(): void {
    localStorage.removeItem('Promo Code');
  }
}
