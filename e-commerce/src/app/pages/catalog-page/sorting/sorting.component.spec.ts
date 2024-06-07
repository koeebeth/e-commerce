import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import SortingComponent from './sorting.component';
import * as actions from '../../../store/actions';
import { CommonModule } from '@angular/common';
import TokenStorageService from '../../../shared/services/tokenStorage/tokenstorage.service';

describe('SortingComponent', () => {
  let component: SortingComponent;
  let fixture: ComponentFixture<SortingComponent>;
  let store: MockStore;
  let tokenStorageServiceMock: jasmine.SpyObj<TokenStorageService>;

  beforeEach(async () => {
    tokenStorageServiceMock = jasmine.createSpyObj('TokenStorageService', ['getAuthToken', 'getAnonymousToken']);
    await TestBed.configureTestingModule({
      imports: [SortingComponent, CommonModule, FormsModule],
      providers: [
        provideMockStore(),
        { provide: Store, useValue: { dispatch: jasmine.createSpy() } },
        {
          provide: TokenStorageService,
          useValue: tokenStorageServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SortingComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSortChange should call applySort with the selected sort value', () => {
    spyOn(component, 'applySort');
    const selectElement = 'price-asc';
    const event = { target: { value: selectElement } } as unknown as Event;
    component.onSortChange(event);
    expect(component.applySort).toHaveBeenCalledWith(selectElement);
  });

  it('applySort should dispatch saveSort and loadFilter for name-asc parameter', () => {
    component.applySort('name-asc');

    expect(store.dispatch).toHaveBeenCalledWith(actions.saveSort({ sort: 'name.en-US asc' }));
    expect(store.dispatch).toHaveBeenCalledWith(actions.loadFilter({ sort: 'name.en-US asc', offset: 0, limit: 10 }));
  });

  it('applySort should dispatch saveSort and loadFilter for name-desc parameter', () => {
    component.applySort('name-desc');

    expect(store.dispatch).toHaveBeenCalledWith(actions.saveSort({ sort: 'name.en-US desc' }));
    expect(store.dispatch).toHaveBeenCalledWith(actions.loadFilter({ sort: 'name.en-US desc', offset: 0, limit: 10 }));
  });

  it('applySort should dispatch saveSort and loadFilter for price-asc parameter', () => {
    component.applySort('price-asc');

    expect(store.dispatch).toHaveBeenCalledWith(actions.saveSort({ sort: 'price asc' }));
    expect(store.dispatch).toHaveBeenCalledWith(actions.loadFilter({ sort: 'price asc', offset: 0, limit: 10 }));
  });

  it('applySort should dispatch saveSort and loadFilter for price-desc parameter', () => {
    component.applySort('price-desc');

    expect(store.dispatch).toHaveBeenCalledWith(actions.saveSort({ sort: 'price desc' }));
    expect(store.dispatch).toHaveBeenCalledWith(actions.loadFilter({ sort: 'price desc', offset: 0, limit: 10 }));
  });
});
