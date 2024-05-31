import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppState } from '../../../store/store';
import * as actions from '../../../store/actions';
import { Store } from '@ngrx/store';

interface FilterGroup {
  name: string;
  isOpen: boolean;
  filters: string[];
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  isFilterMenuOpen: boolean = false;
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
      filters: ['Under $5', '$5 - $15', 'Above $15'],
    },
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
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
}
