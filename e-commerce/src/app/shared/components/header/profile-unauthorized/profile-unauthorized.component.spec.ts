import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUnauthorizedComponent } from './profile-unauthorized.component';

describe('ProfileUnauthorizedComponent', () => {
  let component: ProfileUnauthorizedComponent;
  let fixture: ComponentFixture<ProfileUnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileUnauthorizedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
