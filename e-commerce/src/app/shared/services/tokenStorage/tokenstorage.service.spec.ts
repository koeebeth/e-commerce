import { TestBed } from '@angular/core/testing';
import TokenStorageService from './tokenstorage.service';

describe('TokenStorageService', () => {
  let service: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get auth token from local storage', () => {
    const token = 'auth-token';
    spyOn(localStorage, 'getItem').and.returnValue(token);
    const result = service.getAuthToken();
    expect(result).toBe(token);
    expect(localStorage.getItem).toHaveBeenCalledWith('AuthRefresh');
  });

  it('should save auth token to local storage', () => {
    const token = 'auth-token';
    spyOn(localStorage, 'setItem');
    service.saveAuthToken(token);
    expect(localStorage.setItem).toHaveBeenCalledWith('AuthRefresh', token);
  });

  it('should remove auth token from local storage', () => {
    spyOn(localStorage, 'removeItem');
    service.removeAuthToken();
    expect(localStorage.removeItem).toHaveBeenCalledWith('AuthRefresh');
  });

  it('should get anonymous token from local storage', () => {
    const token = 'anon-token';
    spyOn(localStorage, 'getItem').and.returnValue(token);
    const result = service.getAnonymousToken();
    expect(result).toBe(token);
    expect(localStorage.getItem).toHaveBeenCalledWith('AnonymousRefresh');
  });

  it('should save anonymous token to local storage', () => {
    const token = 'anon-token';
    spyOn(localStorage, 'setItem');
    service.saveAnonymousToken(token);
    expect(localStorage.setItem).toHaveBeenCalledWith('AnonymousRefresh', token);
  });

  it('should remove anonymous token from local storage', () => {
    spyOn(localStorage, 'removeItem');
    service.removeAnonymousToken();
    expect(localStorage.removeItem).toHaveBeenCalledWith('AnonymousRefresh');
  });
});
