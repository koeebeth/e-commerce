import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import NotFoundComponent from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct error message', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.error-message').textContent).toContain('Looks like you got lost');
  });

  it('should display correct error text', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.error-text').textContent).toContain('Come back and try again');
  });
});
