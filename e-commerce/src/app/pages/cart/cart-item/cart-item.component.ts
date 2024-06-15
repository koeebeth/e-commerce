import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../../shared/services/products/productTypes';
import { CartBase, LineItem } from '../../../shared/services/commercetoolsApi/apitypes';
import ButtonComponent from '../../../shared/components/button/button.component';
import { AppState } from '../../../store/store';
import * as actions from '../../../store/actions';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export default class CartItemComponent {
  @Input() product:
    | (Product &
        LineItem & { price: { discounted?: { value: { centAmount: number } }; value: { centAmount: number } } })
    | null = null;

  @Input() cartBase: CartBase | null = null;

  name = '';

  imageUrl = '';

  quantity = 0;

  totalPrice = '';

  originalTotal = '';

  quantityPrice = '';

  discountedPrice = '';

  discountPercent: number | null = null;

  id = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    if (this.product) {
      this.name = this.product.name?.['en-US'] || '';
      this.imageUrl =
        this.product.masterData?.current?.masterVariant?.images.filter((img) => img.label === 'main')[0].url || '';
      this.quantity = this.product.quantity;
      this.id = this.product.id;
      this.totalPrice = (this.product.totalPrice.centAmount / 100).toFixed(2);
      this.quantityPrice = (this.product.price.value.centAmount / 100).toFixed(2);

      if (this.product.price.discounted) {
        this.discountedPrice = (this.product.price.discounted.value.centAmount / 100).toFixed(2);
        this.discountPercent =
          100 -
          Math.round((this.product.price.discounted.value.centAmount / this.product.price.value.centAmount) * 100);
        this.originalTotal = ((this.product.price.value.centAmount * this.quantity) / 100).toFixed(2);
      }
    }
  }

  onIncrease() {
    if (this.cartBase && this.product) {
      this.store.dispatch(
        actions.loadUpdateAnonymousCart({
          action: 'change-quantity',
          lineItemId: this.product.id,
          cartBase: this.cartBase,
          quantity: this.product.quantity + 1,
        }),
      );
    }
  }

  onDecrease() {
    if (this.cartBase && this.product) {
      this.store.dispatch(
        actions.loadUpdateAnonymousCart({
          action: 'change-quantity',
          lineItemId: this.product.id,
          cartBase: this.cartBase,
          quantity: this.product.quantity - 1,
        }),
      );
    }
  }

  onRemove() {
    if (this.cartBase && this.product) {
      this.store.dispatch(
        actions.loadUpdateAnonymousCart({
          action: 'remove',
          lineItemId: this.product.id,
          cartBase: this.cartBase,
        }),
      );
    }
  }
}
