import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/store';
import * as actions from '../../../store/actions';

interface FilterGroup {
  icon: string;
  name: string;
  isOpen: boolean;
  filters: { name: string; checked: boolean; id: string }[];
}
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export default class FilterComponent {
  isFilterMenuOpen: boolean = false;

  priceRange: { from: number | null; to: number | null } = { from: null, to: null };

  filters$!: Observable<{ [key: string]: string[] }>;

  filters!: { [key: string]: string[] };

  filterGroups: FilterGroup[] = [
    {
      name: 'Category',
      icon: '🤖',
      isOpen: false,
      filters: [],
    },
    // {
    //   name: 'Discount',
    //   icon: '🤩',
    //   isOpen: false,
    //   filters: [
    //     { name: 'With', checked: false, id: '1' },
    //     { name: 'Without', checked: false, id: '2' },
    //   ],
    // },
    {
      name: 'Price',
      icon: '🤑',
      isOpen: false,
      filters: [],
    },
  ];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getCategories(() => {
        if (params['category']) {
          this.setCategoryFilter(params['category']);
          this.applyFiltersFromUrl();
        }
      });
    });
  }

  applyFiltersFromUrl() {
    const appliedFilters: { [key: string]: string[] } = {};
    this.addCategoryFilters(appliedFilters);
  }

  setCategoryFilter(categoryId: string) {
    const categoryGroup = this.filterGroups.find((group) => group.name === 'Category');
    if (categoryGroup) {
      categoryGroup.filters.forEach((filter) => {
        filter.checked = filter.id === categoryId;
      });
    }
    this.toggleFilterMenu();
  }

  getCategories(callback?: () => void) {
    this.store.dispatch(actions.loadCategories({ offset: 0, limit: 100 }));
    this.store
      .select((state) => state.app.categories)
      .subscribe((categories) => {
        if (categories) {
          const categoryFilters = categories.results.map((category) => ({
            name: category?.name['en-US'] || '',
            id: category?.id || '',
            checked: false,
          }));
          this.filterGroups[0].filters = categoryFilters;
          if (callback) {
            callback();
          }
        }
      });
  }

  toggleFilterMenu() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }

  toggleGroup(groupName: string) {
    const group = this.filterGroups.find((g) => g.name === groupName);
    if (group) {
      group.isOpen = !group.isOpen;
    }
  }

  // For discount button
  // onSingleSelect(filter: { name: string; id: string; checked: boolean }, groupName: string) {
  //   if (groupName === 'Discount') {
  //     this.filterGroups.forEach((group) => {
  //       if (group.name === 'Discount') {
  //         group.filters.forEach((disc) => {
  //           if (disc.id !== filter.id) {
  //             disc.checked = false;
  //           }
  //         });
  //       }
  //     });
  //   }
  // }


  getCheckedFilters(groupName: string): { name: string; checked: boolean; id: string }[] {
    const group = this.filterGroups.find((g) => g.name === groupName);
    if (group) {
      return group.filters.filter((filter) => filter.checked);
    }
    return [];
  }

  addCategoryFilters(appliedFilters: { [key: string]: string[] }) {
    const categoryFilters = this.getCheckedFilters('Category');
    const categoryIds = categoryFilters.map((filter) => filter.id);
    appliedFilters['categories.id'] = categoryIds;
  }

  parseToCents(value: number): number {
    return value * 100;
  }

  addPriceFilters(appliedFilters: { [key: string]: string[] }) {
    const priceRangeFrom = this.priceRange.from !== null ? this.parseToCents(this.priceRange.from) : null;
    const priceRangeTo = this.priceRange.to !== null ? this.parseToCents(this.priceRange.to) : null;

    if (priceRangeFrom !== null && priceRangeTo !== null) {
      appliedFilters['variants.prices.value.centAmount'] = [`range(${priceRangeFrom} to ${priceRangeTo})`];
    }
  }

  addDiscountFilters(appliedFilters: { [key: string]: string[] }) {
    const discountedFilters = this.getCheckedFilters('Discount');
    const discountedWith = discountedFilters.find((filter) => filter.name === 'With')?.checked || false;
    const discountedWithout = discountedFilters.find((filter) => filter.name === 'Without')?.checked || false;
    const discounted = discountedWith ? true : discountedWithout ? false : null;

    if (discounted !== null) {
      appliedFilters['variants.scopedPriceDiscounted'] = [discounted.toString()];
    }
  }

  applyFilters() {
    const appliedFilters: { [key: string]: string[] } = {};
    this.addCategoryFilters(appliedFilters);
    this.addPriceFilters(appliedFilters);
    this.addDiscountFilters(appliedFilters);
    this.store.dispatch(actions.saveFilter({ filters: appliedFilters }));
    this.toggleFilterMenu();
  }

  resetFilters() {
    this.filterGroups.forEach((group) => {
      group.filters.forEach((filter) => {
        filter.checked = false;
      });
    });
    this.priceRange = { from: null, to: null };

    this.applyFilters();
    this.toggleFilterMenu();
  }
}
