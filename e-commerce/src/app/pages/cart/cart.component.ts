import { Store } from '@ngrx/store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  imports: [CommonModule, RouterLink, ButtonComponent, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export default class CartComponent {
  cart: CartBase | null = null;

  products: LineItem[] = [];

  promoCodeForm = new FormGroup({
    code: new FormControl(''),
  });

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectCart).subscribe((cart) => {
      if (cart) {
        this.cart = cart;
        this.products = cart.lineItems;
      }
    });
  }

  calcTotal(): string {
    const total = this.cart!.totalPrice.centAmount;
    return (total / 100).toFixed(2);
  }

  onApplyPromo() {}
}
