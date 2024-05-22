import { ComponentFixture, TestBed } from '@angular/core/testing';

import ProfileAuthorizedComponent from './profile-authorized.component';
import { provideStore } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

describe('ProfileAuthorizedComponent', () => {
  let component: ProfileAuthorizedComponent;
  let fixture: ComponentFixture<ProfileAuthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAuthorizedComponent],
      providers: [
        provideStore(),
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
