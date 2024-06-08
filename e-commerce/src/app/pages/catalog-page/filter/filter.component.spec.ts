import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import FilterComponent from './filter.component';
import * as actions from '../../../store/actions';
import { selecCategories } from '../../../store/selectors';
import TokenStorageService from '../../../shared/services/tokenStorage/tokenstorage.service';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let unsubscribe$: Subject<void>;
  let store: MockStore;
  let tokenStorageServiceMock: jasmine.SpyObj<TokenStorageService>;

  beforeEach(async () => {
    tokenStorageServiceMock = jasmine.createSpyObj('TokenStorageService', ['getAuthToken', 'getAnonymousToken']);
    await TestBed.configureTestingModule({
      imports: [FilterComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: selecCategories, value: { results: [] } }],
        }),
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ category: 'Category 1' }) },
        },
        {
          provide: Router,
          useValue: { url: '/catalog' },
        },
        {
          provide: TokenStorageService,
          useValue: tokenStorageServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    unsubscribe$ = new Subject<void>();

    fixture.detectChanges();
  });

  afterEach(() => {
    unsubscribe$.next();
    unsubscribe$.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadFilter action with correct filters', () => {
    tokenStorageServiceMock.getAuthToken.and.returnValue(null);
    tokenStorageServiceMock.getAnonymousToken.and.returnValue(null);

    const mockCategoryFilters = { category1: ['value1'], category2: ['value2'] };
    spyOn(component, 'getCategoryFilters').and.returnValue(mockCategoryFilters);
    const dispatchSpy = spyOn(store, 'dispatch');

    component.applyFilterFromUrl();

    expect(component.getCategoryFilters).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(
      actions.loadFilter({
        filters: mockCategoryFilters,
        offset: 0,
        limit: 10,
      }),
    );
  });

  describe('setCategoryFilter', () => {
    it('should set the filter to checked if it matches the category ID', () => {
      component.filterGroups = [
        {
          icon: '',
          name: '',
          isOpen: false,
          filters: [
            { name: 'category1', id: 'category1', checked: false },
            { name: 'category2', id: 'category2', checked: false },
          ],
        },
      ];

      component.setCategoryFilter('category1');

      expect(component.filterGroups[0].filters[0].checked).toBeTrue();
      expect(component.filterGroups[0].filters[1].checked).toBeFalse();
    });

    it('should call toggleFilterMenu', () => {
      spyOn(component, 'toggleFilterMenu');
      component.filterGroups = [
        {
          icon: '',
          name: '',
          isOpen: false,
          filters: [
            { name: 'category1', id: 'category1', checked: false },
            { name: 'category2', id: 'category2', checked: false },
          ],
        },
      ];

      component.setCategoryFilter('category1');

      expect(component.toggleFilterMenu).toHaveBeenCalled();
    });
  });

  describe('getCategories', () => {
    it('should dispatch the loadCategories action', () => {
      tokenStorageServiceMock.getAuthToken.and.returnValue(null);
      tokenStorageServiceMock.getAnonymousToken.and.returnValue(null);

      const dispatchSpy = spyOn(store, 'dispatch');

      component.getCategories();

      expect(dispatchSpy).toHaveBeenCalledWith(actions.loadCategories({ offset: 0, limit: 100 }));
    });
  });

  describe('toggleFilterMenu', () => {
    it('should toggle the isFilterMenuOpen property', () => {
      component.isFilterMenuOpen = false;

      component.toggleFilterMenu();

      expect(component.isFilterMenuOpen).toBeTrue();

      component.toggleFilterMenu();

      expect(component.isFilterMenuOpen).toBeFalse();
    });
  });

  it('onSingleSelect should only check the provided filter and uncheck others in the same category group', () => {
    component.filterGroups = [
      {
        name: 'Category',
        icon: '',
        isOpen: false,
        filters: [
          { name: 'Filter 1', id: '1', checked: true },
          { name: 'Filter 2', id: '2', checked: false },
          { name: 'Filter 3', id: '3', checked: false },
        ],
      },
      {
        name: 'Price',
        icon: '',
        isOpen: false,
        filters: [
          { name: 'Filter 4', id: '4', checked: false },
          { name: 'Filter 5', id: '5', checked: false },
        ],
      },
    ];

    component.onSingleSelect({ name: 'Filter 1', id: '1', checked: false }, 'Category');

    expect(component.filterGroups[0].filters[0].checked).toBeTrue();
    expect(component.filterGroups[0].filters[1].checked).toBeFalse();
    expect(component.filterGroups[0].filters[2].checked).toBeFalse();

    expect(component.filterGroups[1].filters[0].checked).toBeFalse();
    expect(component.filterGroups[1].filters[1].checked).toBeFalse();
  });

  it('getCheckedFilters should return checked filters for the provided group name', () => {
    component.filterGroups = [
      {
        name: 'Category',
        icon: '',
        isOpen: false,
        filters: [
          { name: 'Filter 1', id: '1', checked: true },
          { name: 'Filter 2', id: '2', checked: false },
          { name: 'Filter 3', id: '3', checked: true },
        ],
      },
      {
        name: 'Price',
        icon: '',
        isOpen: false,
        filters: [
          { name: 'Filter 4', id: '4', checked: false },
          { name: 'Filter 5', id: '5', checked: true },
        ],
      },
    ];

    const checkedFilters = component.getCheckedFilters('Category');
    expect(checkedFilters.length).toBe(2);
    expect(checkedFilters[0].name).toBe('Filter 1');
    expect(checkedFilters[1].name).toBe('Filter 3');

    const checkedPriceFilters = component.getCheckedFilters('Price');
    expect(checkedPriceFilters.length).toBe(1);
    expect(checkedPriceFilters[0].name).toBe('Filter 5');
  });

  it('getCategoryFilters should return applied category filters', () => {
    component.filterGroups = [
      {
        name: 'Category',
        icon: '',
        isOpen: false,
        filters: [
          { name: 'Filter 1', id: '1', checked: true },
          { name: 'Filter 2', id: '2', checked: false },
          { name: 'Filter 3', id: '3', checked: true },
        ],
      },
    ];

    const categoryFilters = component.getCategoryFilters();

    expect(categoryFilters['categories.id']).toEqual(['1', '3']);
  });

  it('parseToCents should correctly convert a price value to cents', () => {
    expect(component.parseToCents(10.5)).toBe(1050);
    expect(component.parseToCents(0)).toBe(0);
    expect(component.parseToCents(100)).toBe(10000);
  });

  it('getPriceFilters should return applied price filters', () => {
    component.priceRange = { from: 10, to: 50 };

    const priceFilters = component.getPriceFilters();

    expect(priceFilters['variants.prices.value.centAmount']).toEqual(['range(1000 to 5000)']);
  });

  it('applyFilters should dispatch saveFilter action with applied filters and toggle filter menu', () => {
    spyOn(component, 'getCategoryFilters').and.returnValue({ 'categories.id': ['1', '2'] });
    spyOn(component, 'getPriceFilters').and.returnValue({
      'variants.prices.value.centAmount': ['range(1000 to 5000)'],
    });
    spyOn(component.store, 'dispatch');
    spyOn(component, 'toggleFilterMenu');

    component.applyFilters();

    expect(component.getCategoryFilters).toHaveBeenCalled();
    expect(component.getPriceFilters).toHaveBeenCalled();

    expect(component.store.dispatch).toHaveBeenCalledWith(
      actions.saveFilter({
        filters: { 'categories.id': ['1', '2'], 'variants.prices.value.centAmount': ['range(1000 to 5000)'] },
      }),
    );

    expect(component.toggleFilterMenu).toHaveBeenCalled();
  });

  it('resetFilters should uncheck all filters and reset price range', () => {
    component.filterGroups = [
      {
        name: 'Category',
        icon: '',
        isOpen: false,
        filters: [
          { name: 'Filter 1', id: '1', checked: true },
          { name: 'Filter 2', id: '2', checked: false },
        ],
      },
    ];
    component.priceRange = { from: 10, to: 50 };

    component.resetFilters();

    component.filterGroups.forEach((group) => {
      group.filters.forEach((filter) => {
        expect(filter.checked).toBeFalse();
      });
    });
    expect(component.priceRange).toEqual({ from: null, to: null });
  });

  it('resetFilters should apply filters and toggle filter menu', () => {
    spyOn(component, 'applyFilters');
    spyOn(component, 'toggleFilterMenu');

    component.resetFilters();

    expect(component.applyFilters).toHaveBeenCalled();
    expect(component.toggleFilterMenu).toHaveBeenCalled();
  });
});
