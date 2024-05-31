import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import SliderComponent from './slider/slider.component';
import { AppState } from '../../store/store';
import { Product, ProductPagedQueryResponse } from '../../shared/services/products/productTypes';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SliderComponent, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export default class ProductComponent {
  productObjects$!: Observable<ProductPagedQueryResponse | null>;

  productResponse!: ProductPagedQueryResponse;

  product!: Product | undefined;

  name: string = '';

  description: string = '';

  centAmount: number = 0;

  fractionDigits: number = 0;

  discountCentAmount: number = 0;

  discountFractionDigits: number = 0;

  price!: string;

  originalPrice!: number;

  discuntedPrice!: number;

  discountPercnt!: number;

  currency!: string;

  imageUrls: string[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
  ) {
    register();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.productObjects$ = this.store.select((state) => state.app.products);
      this.productObjects$.subscribe((products) => {
        this.product = products?.results.find((p) => p.id === productId);
        if (this.product) {
          this.name = this.product?.masterData?.current?.name['en-US'] || '';
          if (this.product?.masterData?.current?.description) {
            this.description = this.product?.masterData?.current?.description['en-US'] || '';
          }
        } else {
          this.router.navigate(['/catalog']);
        }
        this.getImages();
        this.getOriginalPrice();
        this.getDiscuntedPrice();
        this.formatPrice();
        this.getDiscountProcentage();
      });
    });
  }

  getImages() {
    const imagesWithEmptyLabel = this.product?.masterData?.current?.masterVariant?.images.filter(
      (image) => !image.label,
    );
    this.imageUrls = imagesWithEmptyLabel?.map((image) => image.url);
    this.imageUrls?.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }

  getDiscuntedPrice() {
    const discounts = this.product?.masterData?.current?.masterVariant?.prices;
    const priceObj = discounts?.find(
      (d) => d.discounted?.value?.centAmount != null && d.discounted?.value?.fractionDigits != null,
    );

    if (priceObj && priceObj.discounted?.value) {
      this.discountCentAmount = priceObj.discounted.value.centAmount ?? 0;
      this.discountFractionDigits = priceObj.discounted.value.fractionDigits ?? 2;
    }
  }

  getOriginalPrice() {
    const prices = this.product?.masterData?.current?.masterVariant?.prices;
    const priceObj = prices?.find((p) => p.value?.centAmount != null && p.value?.fractionDigits != null);

    if (priceObj && priceObj.value) {
      this.centAmount = priceObj.value.centAmount ?? 0;
      this.fractionDigits = priceObj.value.fractionDigits ?? 2;
    }
  }

  formatPrice() {
    this.originalPrice = this.centAmount / 10 ** this.fractionDigits;
    this.discuntedPrice = this.discountCentAmount / 10 ** this.discountFractionDigits;
    this.currency =
      this.product?.masterData?.current?.masterVariant?.prices?.find((c) => c.value?.currencyCode != null)?.value
        ?.currencyCode ?? 'USD';
  }

  getDiscountProcentage() {
    const originalPrice = this.centAmount / 10 ** this.fractionDigits;
    const discuntedPrice = this.discountCentAmount / 10 ** this.discountFractionDigits;

    if (originalPrice !== 0 && discuntedPrice !== 0) {
      this.discountPercnt = parseFloat((((originalPrice - discuntedPrice) / originalPrice) * 100).toFixed(0));
    } else {
      this.discountPercnt = 0;
    }
  }
}
