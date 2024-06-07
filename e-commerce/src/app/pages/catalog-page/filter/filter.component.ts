import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, combineLatest, takeUntil } from 'rxjs';
import { AppState } from '../../../store/store';
import * as actions from '../../../store/actions';
import { selecCategories } from '../../../store/selectors';

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

  defaultNumValue: number = 0;

  priceRange: { from: number | null; to: number | null } = { from: 0, to: 100 };

  filters$!: Observable<{ [key: string]: string[] }>;

  filters!: { [key: string]: string[] };

  filterGroups: FilterGroup[] = [
    {
      name: 'Category',
      icon: '🤖',
      isOpen: false,
      filters: [],
    },
    {
      name: 'Price',
      icon: '🤑',
      isOpen: false,
      filters: [],
    },
  ];

  unsubscribe$ = new Subject<void>();

  constructor(
    public store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getCategories();

    combineLatest(
      this.route.queryParams,
      this.store.select(selecCategories).pipe(takeUntil(this.unsubscribe$)),
    ).subscribe(([params, categories]) => {
      if (categories) {
        const categoryFilters = categories.results.map((category) => ({
          name: category?.name['en-US'] || '',
          id: category?.id || '',
          checked: false,
        }));
        this.filterGroups[0].filters = categoryFilters;
      }

      if (this.router.url.includes('/catalog') && params['category']) {
        this.setCategoryFilter(params['category']);
        this.applyFilterFromUrl();
      }
    });
  }

  applyFilterFromUrl() {
    const categoryFilters = this.getCategoryFilters();
    const appliedFilters = { ...categoryFilters };

    this.store.dispatch(actions.loadFilter({ filters: appliedFilters, offset: 0, limit: 10 }));
  }

  setCategoryFilter(categoryId: string) {
    const categoryGroup = this.filterGroups[0];
    if (categoryGroup) {
      categoryGroup.filters.forEach((filter) => {
        if (filter.name.toLowerCase() === categoryId) {
          filter.checked = true;
        }
      });
    }
    this.toggleFilterMenu();
  }

  getCategories() {
    this.store.dispatch(actions.loadCategories({ offset: 0, limit: 100 }));
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

  onSingleSelect(filter: { name: string; id: string; checked: boolean }, groupName: string) {
    if (groupName === 'Category') {
      this.filterGroups.forEach((group) => {
        if (group.name === 'Category') {
          group.filters.forEach((disc) => {
            if (disc.id !== filter.id) {
              disc.checked = false;
            }
          });
        }
      });
    }
  }

  getCheckedFilters(groupName: string): { name: string; checked: boolean; id: string }[] {
    const group = this.filterGroups.find((g) => g.name === groupName);
    if (group) {
      return group.filters.filter((filter) => filter.checked);
    }
    return [];
  }

  getCategoryFilters() {
    const appliedFilters: { [key: string]: string[] } = {};
    const categoryFilters = this.getCheckedFilters('Category');
    const categoryIds = categoryFilters.map((filter) => filter.id);
    appliedFilters['categories.id'] = categoryIds;
    return appliedFilters;
  }

  parseToCents(value: number): number {
    return value * 100;
  }

  getPriceFilters() {
    const appliedFilters: { [key: string]: string[] } = {};
    const priceRangeFrom = this.priceRange.from !== null ? this.parseToCents(this.priceRange.from) : 0;
    const priceRangeTo = this.priceRange.to !== null ? this.parseToCents(this.priceRange.to) : 1000;

    appliedFilters['variants.prices.value.centAmount'] = [`range(${priceRangeFrom} to ${priceRangeTo})`];
    return appliedFilters;
  }

  applyFilters() {
    const categoryFilters = this.getCategoryFilters();
    const priceFilters = this.getPriceFilters();

    const appliedFilters = { ...categoryFilters, ...priceFilters };

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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
