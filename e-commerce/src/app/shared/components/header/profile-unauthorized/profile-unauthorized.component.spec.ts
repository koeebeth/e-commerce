import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import ProfileUnauthorizedComponent from './profile-unauthorized.component';

describe('ProfileUnauthorizedComponent', () => {
  let component: ProfileUnauthorizedComponent;
  let fixture: ComponentFixture<ProfileUnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileUnauthorizedComponent],
      providers: [
        provideStore(),
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
