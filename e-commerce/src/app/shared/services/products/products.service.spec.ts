import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import ProductsService from './products.service';
import { CategoriesArray, ProductsArray } from './productTypes';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });

    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products from the API via GET', () => {
    const mockToken = 'mockToken';
    const mockOffset = 0;
    const mockLimit = 10;

    const mockProducts: ProductsArray = {
      offset: 0,
      limit: 10,
      count: 2,
      total: 100,
      results: [
        {
          id: '1',
          name: { 'en-US': 'product 1' },
        },
        {
          id: '2',
          name: { 'en-US': 'product 2' },
        },
      ],
    };

    service.getProducts(mockToken, mockOffset, mockLimit).subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne((request) => {
      return (
        request.url.includes('products') &&
        request.method === 'GET' &&
        request.headers.get('Authorization') === `Bearer ${mockToken}` &&
        request.params.get('offset') === mockOffset.toString() &&
        request.params.get('limit') === mockLimit.toString()
      );
    });

    req.flush(mockProducts);
  });

  it('should fetch product by id from the API via GET', () => {
    const mockToken = 'mockToken';
    const mockProductId = 'mockProductId';

    const mockProduct = {
      id: '1',
      name: { 'en-US': 'product 1' },
    };

    service.getProductById(mockProductId, mockToken).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne((request) => {
      return (
        request.url.includes(`products/${mockProductId}`) &&
        request.method === 'GET' &&
        request.headers.get('Authorization') === `Bearer ${mockToken}` &&
        request.headers.get('Content-Type') === 'application/json'
      );
    });

    req.flush(mockProduct);
  });

  it('should fetch categories from the API via GET', () => {
    const mockToken = 'mockToken';
    const mockOffset = 0;
    const mockLimit = 10;

    const mockCategories: CategoriesArray = {
      offset: 0,
      limit: 10,
      count: 2,
      total: 100,
      results: [
        {
          id: '1',
          key: '1',
          name: { 'en-US': 'Category 1' },
        },
        {
          id: '2',
          key: '2',
          name: { 'en-US': 'Category 2' },
        },
      ],
    };

    service.getCategories(mockToken, mockOffset, mockLimit).subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpTestingController.expectOne((request) => {
      return (
        request.url.includes('categories') &&
        request.method === 'GET' &&
        request.headers.get('Authorization') === `Bearer ${mockToken}` &&
        request.headers.get('Content-Type') === 'application/json' &&
        request.params.get('offset') === mockOffset.toString() &&
        request.params.get('limit') === mockLimit.toString()
      );
    });

    req.flush(mockCategories);
  });

  it('should include sort parameter if provided', () => {
    const mockToken = 'mockToken';
    const mockSort = 'price-asc';
    const mockOffset = 0;
    const mockLimit = 10;

    service.filterProducts(mockToken, undefined, undefined, mockSort, mockOffset, mockLimit).subscribe();

    const req = httpTestingController.expectOne((request) => {
      return request.params.has('sort') && request.params.get('sort') === mockSort;
    });

    req.flush({});
  });

  it('should include filter parameters if provided', () => {
    const mockToken = 'mockToken';
    const mockSearchText = '';
    const mockFilters = { 'categories.id': ['1', '2'], price: ['10', '20'] };
    const mockSort = '';
    const mockOffset = 0;
    const mockLimit = 10;

    service.filterProducts(mockToken, mockSearchText, mockFilters, mockSort, mockOffset, mockLimit).subscribe();

    const req = httpTestingController.expectOne((request) => {
      const filterParams = request.params.getAll('filter');
      return (
        filterParams !== null &&
        filterParams.length === 4 &&
        filterParams.includes('categories.id:"1"') &&
        filterParams.includes('categories.id:"2"') &&
        filterParams.includes('price:10') &&
        filterParams.includes('price:20')
      );
    });

    req.flush({});
  });

  it('should include text and fuzzy parameters if searchText provided', () => {
    const mockToken = 'mockToken';
    const mockSearchText = 'mockSearchText';
    const mockOffset = 0;
    const mockLimit = 10;

    service.filterProducts(mockToken, mockSearchText, undefined, undefined, mockOffset, mockLimit).subscribe();

    const req = httpTestingController.expectOne((request) => {
      return (
        request.params.has('text.en-US') &&
        request.params.get('text.en-US') === mockSearchText &&
        request.params.has('fuzzy') &&
        request.params.get('fuzzy') === 'true'
      );
    });

    req.flush({});
  });
});
