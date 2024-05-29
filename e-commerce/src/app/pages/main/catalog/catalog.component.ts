import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardComponent } from './card/card.component';
import { AppState } from '../../../store/store';
import { Product } from '../../../shared/services/products/productTypes';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  @Input() totalPages: number = 10;
  @Input() card: Product[] = [];

  currentPage: number = 1;
  maxVisiblePages: number = 5;
  productObjects$!: Observable<any>;
  // productObjects$!: Product[]

  constructor(private store: Store<AppState>) {}

  get visiblePages(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  get showDots(): boolean {
    return this.visiblePages[this.visiblePages.length - 1] < this.totalPages;
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  ngOnInit(): void {
    this.productObjects$ = this.store.select((state) => state.app.products);
    this.productObjects$.subscribe((products) => {
      // products.map((product) => {
      console.log(products);
      // })
    });
  }
}
