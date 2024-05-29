import { Component } from '@angular/core';
import SliderComponent from './slider/slider.component';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SliderComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export default class ProductComponent {
  constructor() {
    register();
  }

  originalPrice: number = 1300; // without API

  discountedPrice: number = 999; // without API

  getDiscountPercentage(): number {
    return Math.round(((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100);
  }
}
