import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CategoriesArray, Product } from '../../../shared/services/products/productTypes';
import { LineItem } from '../../../shared/services/commercetoolsApi/apitypes';
import ButtonComponent from '../../../shared/components/button/button.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

  promoPrice = '';

  promoTotal = '';

  originalPrice = '';

  category: string | undefined = '';

  constructor(private router: Router) {}

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

    if (this.product.discountedPricePerQuantity.length > 0) {
      this.originalPrice = ((this.product.price.value.centAmount * this.quantity) / 100).toFixed(2);
      this.product.discountedPricePerQuantity.forEach((promo) => {
        if (promo.quantity === this.quantity) {
          this.promoPrice = (promo.discountedPrice.value.centAmount / 100).toFixed(2);
          this.promoTotal = ((promo.discountedPrice.value.centAmount * this.quantity) / 100).toFixed(2);
        }
      });
    }
  }

  onCardClick(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/catalog', this.category, this.product.productId]);
  }
}
