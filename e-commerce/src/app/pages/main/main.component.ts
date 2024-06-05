import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import SliderComponent from './slider/slider.component';
import CatalogComponent from './catalog/catalog.component';
import { AppState } from '../../store/store';
import * as actions from '../../store/actions';
import { CategoriesArray } from '../../shared/services/products/productTypes';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SliderComponent, CommonModule, CatalogComponent, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export default class MainComponent {

  categories$!: Observable<CategoriesArray | null>;

  categories = [
    {
      categoryName: 'ACTION',
      image: '../../../assets/eldenring.jpeg',
      alt: 'action',
      query: 'action',
    },
    {
      categoryName: 'RPG',
      image: '../../../assets/conan.jpeg',
      alt: 'rpg',
      query: 'rpg',
    },
    {
      categoryName: 'STRATEGY',
      image: '../../../assets/stellaris.jpeg',
      alt: 'strategy',
      query: 'strategy',
    },
  ];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.store.dispatch(actions.resetFilter());
    this.store.dispatch(actions.loadCategories({ offset: 0, limit: 10 }));

    this.store.dispatch(actions.loadProducts({ offset: 0, limit: 5 }));
    this.categories$ = this.store.select((state) => state.app.categories);
    this.categories$.pipe(takeUntil(this.unsubscribe$)).subscribe((categories) => {
      categories?.results.forEach((category) => {
        const nameMatch = this.categories.find(
          (categoryName) => categoryName.query === category.name['en-US'].toLowerCase(),
        );
        if (nameMatch) {
          nameMatch.query = `${category.id}`;
        }
      });
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
