import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import MainComponent from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display categories', () => {
    const compiled = fixture.debugElement.nativeElement;
    const categoryElements = compiled.querySelectorAll('.category-name');
    expect(categoryElements.length).toBe(component.categories.length);
    component.categories.forEach((category, index) => {
      expect(categoryElements[index].textContent).toContain(category.categoryName);
    });
  });

  it('should display category images with correct alt tags', () => {
    const imgElements = fixture.debugElement.queryAll(By.css('.category-img'));
    imgElements.forEach((img, index) => {
      expect(img.properties['alt']).toBe(component.categories[index].alt);
    });
  });
});
