import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import AppComponent from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideStore(),
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
