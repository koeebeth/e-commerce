import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import CommerceApiService from './commercetoolsapi.service';
import { AuthData, CartBase, CustomerDraft } from './apitypes';
import { authVisitorAPI } from '../../../../environment';
import { HttpHeaders } from '@angular/common/http';

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

  describe('registration()', () => {
    it('should register a new customer', () => {
      const mockCustomerDraft = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        addresses: [],
        defaultShippingAddress: 0,
        defaultBillingAddress: 0,
        shippingAddresses: [],
        billingAddresses: [],
      };
      const mockAnonToken = 'mock-anon-token';
      const mockAnonymousId = 'mock-anonymous-id';
      const mockResponse: CustomerDraft = {
        email: 'test@example.com',
        password: 'password',
        firstName: 'Name',
        lastName: 'Surname',
        dateOfBirth: '1990-01-01',
        addresses: [],
        anonymousId: '',
        defaultShippingAddress: 0,
        defaultBillingAddress: 0,
        shippingAddresses: [],
        billingAddresses: [],
      };

      service.registration(mockCustomerDraft, mockAnonToken, mockAnonymousId).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne((request) => request.method === 'POST' && request.url.includes('/customers'));
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockAnonToken}`);
      expect(req.request.body).toEqual({
        email: mockCustomerDraft.email,
        password: mockCustomerDraft.password,
        firstName: mockCustomerDraft.firstName,
        lastName: mockCustomerDraft.lastName,
        dateOfBirth: mockCustomerDraft.dateOfBirth,
        addresses: mockCustomerDraft.addresses,
        anonymousId: mockAnonymousId,
        defaultShippingAddress: mockCustomerDraft.defaultShippingAddress,
        defaultBillingAddress: mockCustomerDraft.defaultBillingAddress,
        shippingAddresses: mockCustomerDraft.shippingAddresses,
        billingAddresses: mockCustomerDraft.billingAddresses,
      });
      req.flush(mockResponse);
    });
  });
  
  it('should authenticate a customer', () => {
    const username = 'testuser';
    const password = 'testpassword';
    const authUrl = `${authVisitorAPI.ctpAuthUrl}/oauth/${authVisitorAPI.ctpProjectKey}/customers/token`;
    const expectedBody = `grant_type=password&username=${username}&password=${password}&scope=${authVisitorAPI.ctpScopes}`;
    const expectedHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Basic ${btoa(`${authVisitorAPI.ctpClientId}:${authVisitorAPI.ctpClientSecret}`)}`);
    const dummyAuthData: AuthData = {
      access_token: 'dummy-token',
      expires_in: 3600,
      token_type: 'Bearer',
      scope: '',
      refresh_token: ''
    };

    service.authentication(username, password).subscribe((data) => {
      expect(data).toEqual(dummyAuthData);
    });

    const req = httpMock.expectOne(authUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(expectedBody);
    expect(req.request.headers.get('Content-Type')).toBe(expectedHeaders.get('Content-Type'));
    expect(req.request.headers.get('Authorization')).toBe(expectedHeaders.get('Authorization'));
    req.flush(dummyAuthData);
  });
});
