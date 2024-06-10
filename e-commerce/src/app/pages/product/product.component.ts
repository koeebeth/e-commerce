import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import SliderComponent from './slider/slider.component';
import { AppState } from '../../store/store';
import { Product, CategoriesArray } from '../../shared/services/products/productTypes';
import * as actions from '../../store/actions';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SliderComponent, CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export default class ProductComponent {
  productObjects$!: Observable<Product | null>;

  categoryObjects$!: Observable<CategoriesArray | null>;

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

  productID: string = '';

  categoryID: string = '';

  category: string | undefined = '';

  categoryRouter: string = '';

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
  ) {
    register();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productID = params['id'];
    });
    this.store.dispatch(actions.loadProductId({ id: this.productID }));
    this.productObjects$ = this.store.select((state) => state.app.product);
    this.productObjects$.subscribe((product) => {
      if (product) {
        this.product = product;
        this.name = product.masterData?.current?.name['en-US'] || '';
        if (product.masterData?.current?.description) {
          this.description = product.masterData?.current?.description['en-US'] || '';
        }
        this.getImages();
        this.getOriginalPrice();
        this.getDiscuntedPrice();
        this.formatPrice();
        this.getDiscountProcentage();
        this.getCategory();
      }
    });
  }

  getCategory() {
    this.store.dispatch(actions.loadCategories({ offset: 0, limit: 10 }));
    this.categoryObjects$ = this.store.select((state) => state.app.categories);
    this.categoryObjects$.subscribe((categories) => {
      if (this.product?.masterData?.current?.categories) {
        this.categoryID = this.product?.masterData?.current?.categories[0].id;
        const category = categories?.results.find((c) => c.id === this.categoryID);
        this.category = category?.name['en-US'];
      }
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
