import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store';
import * as actions from '../../../store/actions';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.scss',
})
export default class SortingComponent {
  @Input() sortValue!: string;

  sortOptions = [
    { label: 'Name: A to Z', value: 'name-asc' },
    { label: 'Name: Z to A', value: 'name-desc' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
  ];

  constructor(private store: Store<AppState>) {}

  onSortChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const sortValue = selectElement.value;
    this.applySort(sortValue);
  }

  applySort(sortValue: string) {
    let sortParam = '';
    console.log('sortValue', sortValue);
    switch (sortValue) {
      case 'name-asc':
        sortParam = 'name.en asc';
        break;
      case 'name-desc':
        sortParam = 'name.en desc';
        break;
      case 'price-asc':
        sortParam = 'price asc';
        break;
      case 'price-desc':
        sortParam = 'price desc';
        break;
      default:
        sortParam = '';
    }
    this.store.dispatch(actions.loadFilter({ sort: sortParam, offset: 0, limit: 10 }));
  }
}
