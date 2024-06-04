import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppState } from '../../store/store';
import * as actions from '../../store/actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CategoriesArray } from '../../shared/services/products/productTypes';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export default class CategoriesComponent {
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
    {
      categoryName: 'SIMULATION',
      image: '../../../assets/FC24.jpeg',
      alt: 'simulation',
      query: 'simulation',
    },
    {
      categoryName: 'ADVENTURE',
      image: '../../../assets/adventure.jpg',
      alt: 'adventure',
      query: 'adventure',
    },
  ];

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  ngOnInit() {
    this.store.dispatch(actions.loadProducts({ offset: 0, limit: 5 }));
    this.store.dispatch(actions.loadCategories({ offset: 0, limit: 10 }));
    this.categories$ = this.store.select((state) => state.app.categories);

    this.categories$.subscribe((categories) => {
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

  updateQueryParams(categoryId: string) {
    this.router.navigate(['/catalog'], {
      queryParams: { category: categoryId },
      queryParamsHandling: 'merge',
    });
  }
}
