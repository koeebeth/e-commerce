import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export default class ProductComponent {
  originalPrice: number = 1300; // without API

  discountedPrice: number = 999; // without API

  getDiscountPercentage(): number {
    return Math.round(((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100);
  }
}
