import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import ButtonComponent from '../../shared/components/button/button.component';
import { AppState } from '../../store/store';
import { selectCart } from '../../store/selectors';
import { LineItem, CartBase } from '../../shared/services/commercetoolsApi/apitypes';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export default class CartComponent {
  cart: CartBase | null = null;

  products: LineItem[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectCart).subscribe((cart) => {
      if (cart) {
        this.cart = cart;
        this.products = cart.lineItems;
      }
    });
  }

  calcTotal(sale: boolean = false): string {
    let total;
    if (sale) {
      total = this.products.reduce((prev, cur) => prev + cur.price.value.centAmount, 0);
    } else {
      total = this.cart!.totalPrice.centAmount;
    }
    return (total / 100).toFixed(2);
  }
}
