import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store';
import * as actions from '../../store/actions';
import { CategoriesArray, Category } from '../../shared/services/products/productTypes';
import { selecCategories } from '../../store/selectors';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export default class CategoriesComponent {
  category!: Category;

  categories$!: Observable<CategoriesArray | null>;

  categories!: CategoriesArray;

  categoryImgPath: string = '';

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoryImgPath = '/assets/';
    this.store.dispatch(actions.loadCategories({ offset: 0, limit: 20 }));
    this.categories$ = this.store.select(selecCategories);
    this.categories$.subscribe((categories) => {
      if (categories) {
        this.categories = categories;
      }
    });
  }

  navigateToCategory(categoryKey: string) {
    this.store.dispatch(actions.saveFilter({ filters: { 'categories.name': [categoryKey] } }));
    this.router.navigate(['/catalog'], {
      queryParams: { category: categoryKey },
      queryParamsHandling: 'merge',
    });
  }
}
