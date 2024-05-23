import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import BurgerMenuComponent from './burger-menu.component';

describe('BurgerMenuComponent', () => {
  let component: BurgerMenuComponent;
  let fixture: ComponentFixture<BurgerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgerMenuComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BurgerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
