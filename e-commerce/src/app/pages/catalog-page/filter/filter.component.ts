import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppState } from '../../../store/store';
import * as actions from '../../../store/actions';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

interface FilterGroup {
  name: string;
  isOpen: boolean;
  filters: string[];
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
      filters: ['With', 'Without'],
    },
    {
      name: '🤑 Price',
      isOpen: false,
      filters: []
    }
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
          this.filterGroups[0].filters = categories.results.map((category) => category?.name['en-US'] || '');
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

  onFilterChange(filter: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log(`Filter ${filter} is ${isChecked ? 'checked' : 'unchecked'}`);
  }

  applyFilters() {
    const appliedFilters = {
      categories: this.getCheckedFilters('🤖 Category'),
      discount: this.getCheckedFilters('🤩 Discount'),
      priceRange: this.priceRange
    };
    console.log('Applied Filters:', appliedFilters);
  }

  getCheckedFilters(groupName: string): string[] {
    const group = this.filterGroups.find(g => g.name === groupName);
    if (group) {
      return group.filters.filter(filter => {
        const checkbox = document.querySelector(`input[type='checkbox'][value='${filter}']`) as HTMLInputElement;
        return checkbox.checked;
      });
    }
    return [];
  }
}
