import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import CardComponent from './card/card.component';
import { AppState } from '../../../store/store';
import { ProductsArray } from '../../../shared/services/products/productTypes';
import ButtonComponent from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export default class CatalogComponent {
  productObjects$!: Observable<ProductsArray | null>;

  productResponse!: ProductsArray;

  currentPage: number = 1;

  maxVisiblePages: number = 5;

  totalPages: number = 1;

  visiblePages: number[] = [];

  showDots: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.productObjects$ = this.store.select((state) => state.app.products);
    this.productObjects$.subscribe((products) => {
      if (products) {
        this.productResponse = products;
      }
    });
  }
}
