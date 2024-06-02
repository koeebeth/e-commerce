import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppState } from '../../../store/store';
import * as actions from '../../../store/actions';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

interface FilterGroup {
  name: string;
  isOpen: boolean;
  filters: { name: string; id: string; checked: boolean }[];
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
      name: '🤖 Category',
      isOpen: false,
      filters: [],
    },
    {
      name: '🤩 Discount',
      isOpen: false,
      filters: [
        { name: 'With', id: '1', checked: false },
        { name: 'Without', id: '2', checked: false },
      ],
    },
    {
      name: '🤑 Price',
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

  applyFilters() {
    const categoryFilters = this.getCheckedFilters('🤖 Category');
    const categoryIds = categoryFilters.map((filter) => filter.id);
    this.store.dispatch(actions.loadFilter({ categoryIds: categoryIds, offset: 0, limit: 100 }));
    console.log('Applied Filters:', categoryIds);
  }

  getCheckedFilters(groupName: string): { name: string; id: string; checked: boolean }[] {
    const group = this.filterGroups.find((g) => g.name === groupName);
    if (group) {
      return group.filters.filter((filter) => filter.checked);
    }
    return [];
  }
}
