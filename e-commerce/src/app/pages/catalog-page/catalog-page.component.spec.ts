import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import CatalogPageComponent from './catalog-page.component';

describe('CatalogPageComponent', () => {
  let component: CatalogPageComponent;
  let fixture: ComponentFixture<CatalogPageComponent>;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    storeMock = jasmine.createSpyObj('Store', ['dispatch']);
    await TestBed.configureTestingModule({
      imports: [CatalogPageComponent],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
