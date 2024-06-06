import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import SliderComponent from './slider/slider.component';
import CatalogComponent from './catalog/catalog.component';
import { AppState } from '../../store/store';
import * as actions from '../../store/actions';
import { CategoriesArray, Category } from '../../shared/services/products/productTypes';
import { selecCategories } from '../../store/selectors';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SliderComponent, CommonModule, CatalogComponent, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export default class MainComponent {
  categories$!: Observable<CategoriesArray | null>;
  categories!: CategoriesArray;
  category!: Category;
  categoryImgPath: string = '';

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.store.dispatch(actions.resetFilter());
    this.store.dispatch(actions.loadCategories({ offset: 0, limit: 3 }));
    this.categoryImgPath = '/assets/';
    this.store.dispatch(actions.loadProducts({ offset: 0, limit: 5 }));
    this.categories$ = this.store.select(selecCategories);
    this.categories$.subscribe((categories) => {
      if (categories) {
        this.categories = categories;
      }
    });
  }

  navigateToCategory(categoryId: string) {
    this.store.dispatch(actions.saveFilter({ filters: { 'categories.id': [categoryId] } }));
    this.router.navigate(['/catalog'], {
      queryParams: { category: categoryId },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
