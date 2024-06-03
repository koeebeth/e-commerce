import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store';
import * as actions from '../../../store/actions';

@Component({
  selector: 'app-searching',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './searching.component.html',
  styleUrl: './searching.component.scss',
})
export default class SearchingComponent {
  searchText: string = '';

  constructor(private store: Store<AppState>) {}

  searchProduct() {
    this.store.dispatch(actions.searchProducts({ searchText: this.searchText, offset: 0, limit: 10 }));
  }

  onInputChange() {
    if (!this.searchText) {
      this.searchProduct();
    }
  }
}
