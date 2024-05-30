import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';
import { AppState } from '../../../store/store';
import { Store } from '@ngrx/store';
import * as actions from '../../../store/actions';
import { Observable } from 'rxjs';
import { ProductPagedQueryResponse } from '../../../shared/services/products/productTypes';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  productObjects$!: Observable<ProductPagedQueryResponse | null>;
  productResponse!: ProductPagedQueryResponse;
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
        this.currentPage = Math.floor(this.productResponse.offset) / this.productResponse.limit + 1;
        this.calcTotalPages();
        this.visiblePages = this.calcVisiblePages();
        this.calcShowDots();
      }
    });
  }

  calcTotalPages() {
    this.totalPages = this.productResponse
      ? Math.ceil((this.productResponse.total || 0) / (this.productResponse.limit || 1))
      : 1;
  }

  calcVisiblePages(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  calcShowDots() {
    this.showDots = this.visiblePages[this.visiblePages.length - 1] < this.totalPages;
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updateProducts();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateProducts();
    }
  }

  updateProducts(): void {
    const offset = (this.currentPage - 1) * this.productResponse.limit;
    console.log('offset', offset);
    this.store.dispatch(actions.loadProducts({ offset, limit: this.productResponse.limit }));
  }
}
