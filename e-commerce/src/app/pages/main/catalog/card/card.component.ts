import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../../shared/services/products/productTypes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card!: Product;
  productObjects$!: Observable<Product[]>;

  mainImage: string = '';
  mainGif: string = '';
  name: string = '';
  centAmount: number = 0;
  fractionDigits: number = 0;
  discountCentAmount: number = 0;
  discountFractionDigits: number = 0;
  price!: string;
  originalPrice!: string;
  discuntedPrice!: string;
  discountPercnt!: number;

  ngOnInit(): void {
    this.mainImage = this.card?.masterData?.current?.masterVariant?.images[0]?.url || '';
    this.mainGif = this.card?.masterData?.current?.masterVariant?.images[1]?.url || '';
    this.name = this.card?.masterData?.current?.name['en-US'] || '';
    this.getPrice();
    this.getDiscuntedPrice();
    this.formatPrice();
    this.getDiscountProcentage();
  }

  getDiscuntedPrice() {
    const discounts = this.card?.masterData?.current?.masterVariant?.prices;
    const priceObj = discounts?.find(
      (d) => d.discounted?.value?.centAmount != null && d.discounted?.value?.fractionDigits != null,
    );

    if (priceObj && priceObj.discounted?.value) {
      this.discountCentAmount = priceObj.discounted.value.centAmount ?? 0;
      this.discountFractionDigits = priceObj.discounted.value.fractionDigits ?? 2;
    }
  }

  getPrice() {
    const prices = this.card?.masterData?.current?.masterVariant?.prices;
    const priceObj = prices?.find((p) => p.value?.centAmount != null && p.value?.fractionDigits != null);

    if (priceObj && priceObj.value) {
      this.centAmount = priceObj.value.centAmount ?? 0;
      this.fractionDigits = priceObj.value.fractionDigits ?? 2;
    }
  }

  formatPrice() {
    const price = this.centAmount / Math.pow(10, this.fractionDigits);
    const discuntedPrice = this.discountCentAmount / Math.pow(10, this.discountFractionDigits);
    this.originalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    this.discuntedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(discuntedPrice);
  }

  getDiscountProcentage() {
    const originalPrice = this.centAmount / Math.pow(10, this.fractionDigits);
    const discuntedPrice = this.discountCentAmount / Math.pow(10, this.discountFractionDigits);

    if (originalPrice !== 0 && discuntedPrice !== 0) {
      this.discountPercnt = parseFloat((((originalPrice - discuntedPrice) / originalPrice) * 100).toFixed(0));
    } else {
      this.discountPercnt = 0;
    }
  }

  originalPriceStyles() {
    return {
      'justify-content': this.discountPercnt > 0 ? 'space-between' : 'flex-end',
    };
  }
}
