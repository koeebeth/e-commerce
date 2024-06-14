import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/services/products/productTypes';
import { LineItem } from '../../../shared/services/commercetoolsApi/apitypes';
import ButtonComponent from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export default class CartItemComponent {
  @Input() product!: Product &
    LineItem & { price: { discounted?: { value: { centAmount: number } }; value: { centAmount: number } } };

  name = '';

  imageUrl = '';

  quantity = 0;

  totalPrice = '';

  originalTotal = '';

  quantityPrice = '';

  discountedPrice = '';

  discountPercent: number | null = null;

  id = '';

  ngOnInit() {
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
        100 - Math.round((this.product.price.discounted.value.centAmount / this.product.price.value.centAmount) * 100);
      this.originalTotal = ((this.product.price.value.centAmount * this.quantity) / 100).toFixed(2);
    }
  }
}
