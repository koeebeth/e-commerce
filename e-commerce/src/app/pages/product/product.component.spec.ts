import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import ProductComponent from './product.component';
import { Product, CategoriesArray } from '../../shared/services/products/productTypes';
import * as actions from '../../store/actions';
import SliderComponent from './slider/slider.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let mockActivatedRoute: {
    params: Observable<{
      id: string;
    }>;
  };
  let mockStore: {
    dispatch: jasmine.Spy;
    select: jasmine.Spy;
  };
  let mockRouter: {
    navigate: jasmine.Spy;
  };

  beforeEach(async () => {
    mockActivatedRoute = {
      params: of({ id: 'product-123' }),
    };

    mockStore = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine.createSpy('select').and.returnValue(of(null)),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [ProductComponent, CommonModule, RouterModule, SliderComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load product data', () => {
    expect(mockStore.dispatch).toHaveBeenCalledWith(actions.loadProductId({ id: 'product-123' }));
  });

  it('should set product data', () => {
    const product: Product = {
      id: 'product-123',
      masterData: {
        current: {
          id: 'product-123',
          name: { 'en-US': 'Test Product' },
          description: { 'en-US': 'This is a test product' },
          version: 0,
          categories: [
            {
              typeId: 'category',
              id: 'category-123',
            },
          ],
        },
      },
    };

    const categories: CategoriesArray = {
      limit: 10,
      offset: 0,
      count: 1,
      total: 1,
      results: [
        {
          id: 'category-123',
          key: 'category-123',
          version: 1,
          createdAt: '2023-04-01T00:00:00.000Z',
          lastModifiedAt: '2023-04-01T00:00:00.000Z',
          name: { 'en-US': 'Test Category' },
          slug: { 'en-US': 'test-category' },
          ancestors: [],
          orderHint: '0.0',
        },
      ],
    };

    mockStore.select.and.returnValues(of(product), of(categories));
    component.ngOnInit();

    expect(component.product).toEqual(product);
    expect(component.name).toEqual('Test Product');
    expect(component.description).toEqual('This is a test product');
    expect(component.category).toEqual('Test Category');
  });
});
