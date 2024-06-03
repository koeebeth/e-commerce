import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppState } from '../../../store/store';
import * as actions from '../../../store/actions';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

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
export class FilterComponent {
  isFilterMenuOpen: boolean = false;
  priceRange: { from: number | null; to: number | null } = { from: null, to: null };
  filterGroups: FilterGroup[] = [
    {
      name: 'Category',
      icon: '🤖',
      isOpen: false,
      filters: [],
    },
    {
      name: 'Discount',
      icon: '🤩',
      isOpen: false,
      filters: [
        { name: 'With', checked: false, id: '1' },
        { name: 'Without', checked: false, id: '2' },
      ],
    },
    {
      name: 'Price',
      icon: '🤑',
      isOpen: false,
      filters: [],
    },
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
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
          console.log('this.filterGroups[0].filters', this.filterGroups[0].filters);
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

  getCheckedFilters(groupName: string): { name: string; checked: boolean; id: string }[] {
    const group = this.filterGroups.find((g) => g.name === groupName);
    if (group) {
      return group.filters.filter((filter) => filter.checked);
    }
    return [];
  }

  addCategoryFilters(appliedFilters: { [key: string]: any }) {
    const categoryFilters = this.getCheckedFilters('Category');
    const categoryIds = categoryFilters.map((filter) => filter.id);
    appliedFilters['categories.id'] = categoryIds;
  }

  parseToCents(value: number): number {
    return value * 100;
  }

  addPriceFilters(appliedFilters: { [key: string]: any }) {
    const priceRangeFrom = this.priceRange.from !== null ? this.parseToCents(this.priceRange.from) : null;
    const priceRangeTo = this.priceRange.to !== null ? this.parseToCents(this.priceRange.to) : null;

    if (priceRangeFrom !== null && priceRangeTo !== null) {
      appliedFilters['variants.prices.value.centAmount'] = [`range(${priceRangeFrom} to ${priceRangeTo})`];
    }
  }

  addDiscountFilters(appliedFilters: { [key: string]: any }) {
    const discountedFilters = this.getCheckedFilters('Discount');
    const discountedWith = discountedFilters.find((filter) => filter.name === 'With')?.checked || false;
    const discountedWithout = discountedFilters.find((filter) => filter.name === 'Without')?.checked || false;
    const discounted = discountedWith ? true : discountedWithout ? false : null;

    if (discounted !== null) {
      appliedFilters['variants.scopedPriceDiscounted'] = [discounted];
    }
  }

  applyFilters() {
    const appliedFilters: { [key: string]: any } = {};

    this.addCategoryFilters(appliedFilters);
    this.addPriceFilters(appliedFilters);
    this.addDiscountFilters(appliedFilters);

    this.store.dispatch(actions.loadFilter({ filters: appliedFilters, offset: 0, limit: 10 }));
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
