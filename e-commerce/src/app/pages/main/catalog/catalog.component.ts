import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import CardComponent from './card/card.component';
import { AppState } from '../../../store/store';
import { ProductsArray } from '../../../shared/services/products/productTypes';
import ButtonComponent from '../../../shared/components/button/button.component';
import * as actions from '../../../store/actions';

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

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.productObjects$ = this.store.select((state) => state.app.products);
    this.productObjects$.pipe(takeUntil(this.unsubscribe$)).subscribe((products) => {
      if (products) {
        this.productResponse = products;
      }
    });
  }

  onSeeMore() {
    this.router.navigate(['/catalog']);
    this.store.dispatch(actions.resetFilter());
  }
}
