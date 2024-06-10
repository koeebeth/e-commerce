import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideStore } from '@ngrx/store';
import SearchingComponent from './searching.component';

describe('SearchingComponent', () => {
  let component: SearchingComponent;
  let fixture: ComponentFixture<SearchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, SearchingComponent],
      providers: [provideStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize searchText to an empty string', () => {
    expect(component.searchText).toEqual('');
  });

  it('should call searchProduct when onInputChange is called with empty searchText', () => {
    spyOn(component, 'searchProduct');

    component.searchText = '';
    component.onInputChange();

    expect(component.searchProduct).toHaveBeenCalled();
  });
});
