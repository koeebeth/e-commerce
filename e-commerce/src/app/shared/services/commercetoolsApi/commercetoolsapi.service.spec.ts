import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import CommerceApiService from './commercetoolsapi.service';
import { AuthData, CartBase } from './apitypes';

describe('CommerceApiService', () => {
  let service: CommerceApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CommerceApiService,
        {
          provide: Store,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(CommerceApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAnonymousSessionToken()', () => {
    it('should retrieve an anonymous session token', () => {
      const mockAuthData: AuthData = {
        access_token: 'test_access_token',
        expires_in: 3600,
        token_type: 'Bearer',
        scope: 'test_scope',
        refresh_token: 'test_refresh_token',
      };

      service.getAnonymousSessionToken().subscribe((authData) => {
        expect(authData).toEqual(mockAuthData);
      });

      const req = httpMock.expectOne((request) => request.method === 'POST' && request.url.includes('anonymous/token'));
      expect(req.request.method).toBe('POST');
      req.flush(mockAuthData);
    });
  });

  describe('createAnonymousCart()', () => {
    it('should create an anonymous cart', () => {
      const mockAccessToken = 'mock-access-token';
      const mockCartBase: CartBase = {
        id: 'mock-cart-id',
        version: 1,
        lineItems: [],
        totalPrice: { currencyCode: 'USD', centAmount: 100 },
        discountCodes: [],
        directDiscounts: [],
        createdAt: new Date(),
        lastModifiedAt: new Date(),
      };

      service.createAnonymousCart(mockAccessToken).subscribe((cart) => {
        expect(cart).toEqual(mockCartBase);
      });

      const req = httpMock.expectOne((request) => request.method === 'POST' && request.url.includes('/me/carts'));
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockAccessToken}`);
      req.flush(mockCartBase);
    });
  });
});
