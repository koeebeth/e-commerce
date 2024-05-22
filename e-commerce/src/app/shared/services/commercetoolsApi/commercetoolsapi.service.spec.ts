import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import CommerceApiService from './commercetoolsapi.service';
import { AuthData, CartBase, CustomerDraft } from './apitypes';
import { authVisitorAPI, unauthVisitorAPI } from '../../../../environment';
import { HttpHeaders } from '@angular/common/http';
import TokenStorageService from '../tokenStorage/tokenstorage.service';
import * as actions from '../../../store/actions';

describe('CommerceApiService', () => {
  let service: CommerceApiService;
  let httpMock: HttpTestingController;
  let storeMock: any;
  let tokenStorageServiceMock: any;

  beforeEach(() => {
    tokenStorageServiceMock = jasmine.createSpyObj('TokenStorageService', ['getAuthToken', 'getAnonymousToken']);
    storeMock = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CommerceApiService,
        {
          provide: Store,
          useValue: storeMock,
        },
        {
          provide: TokenStorageService,
          useValue: tokenStorageServiceMock,
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

    const authVisitorAPI = {
      ctpAuthUrl: '...',
      ctpProjectKey: '...',
      ctpScopes:
        'view_tax_categories:tt-e-commerce view_payments:tt-e-commerce view_stores:tt-e-commerce view_types:tt-e-commerce manage_my_orders:tt-e-commerce manage_my_profile:tt-e-commerce manage_my_shopping_lists:tt-e-commerce view_cart_discounts:tt-e-commerce view_attribute_groups:tt-e-commerce manage_shipping_methods:tt-e-commerce view_categories:tt-e-commerce view_published_products:tt-e-commerce manage_my_payments:tt-e-commerce view_orders:tt-e-commerce view_discount_codes:tt-e-commerce',
      ctpClientId: '...',
      ctpClientSecret: '...',
    };

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
      refresh_token: '',
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

  it('should dispatch actions to load anonymous token if neither refresh nor anonymous tokens are present', () => {
    tokenStorageServiceMock.getAuthToken.and.returnValue(null);
    tokenStorageServiceMock.getAnonymousToken.and.returnValue(null);

    service.checkTokens();

    expect(storeMock.dispatch).toHaveBeenCalledWith(actions.loadAnonymousToken());
  });

  it('should dispatch action to refresh access token if refresh token is present', () => {
    tokenStorageServiceMock.getAuthToken.and.returnValue('dummy-refresh-token');
    tokenStorageServiceMock.getAnonymousToken.and.returnValue(null);

    service.checkTokens();

    const expectedBasic = `Basic ${btoa(`${authVisitorAPI.ctpClientId}:${authVisitorAPI.ctpClientSecret}`)}`;
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      actions.refreshAccsessToken({
        refreshToken: 'dummy-refresh-token',
        basic: expectedBasic,
      }),
    );
  });

  it('should dispatch action to update anonymous token if anonymous token is present', () => {
    tokenStorageServiceMock.getAuthToken.and.returnValue(null);
    tokenStorageServiceMock.getAnonymousToken.and.returnValue('dummy-anonymous-token');

    service.checkTokens();

    const expectedBasic = `Basic ${btoa(`${unauthVisitorAPI.ctpClientId}:${unauthVisitorAPI.ctpClientSecret}`)}`;
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      actions.updateAnonymousToken({
        refreshToken: 'dummy-anonymous-token',
        basic: expectedBasic,
      }),
    );
  });
});
