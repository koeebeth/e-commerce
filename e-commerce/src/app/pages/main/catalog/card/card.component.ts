import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Product, ProductsArray, CategoriesArray } from '../../../../shared/services/products/productTypes';
import { AppState } from '../../../../store/store';
import { selecCategories } from '../../../../store/selectors';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export default class CardComponent {
  @Input() card!: Product;

  productObjects$!: Observable<ProductsArray>;

  categoryObjects$!: Observable<CategoriesArray | null>;

  mainImage: string = '';

  mainGif: string = '';

  name: string = '';

  centAmount: number = 0;

  fractionDigits: number = 0;

  discountCentAmount: number = 0;

  discountFractionDigits: number = 0;

  price!: string;

  originalPrice!: number;

  discuntedPrice!: number;

  discountPercnt!: number;

  currency!: string;

  categoryID: string = '';

  category: string | undefined = '';

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.mainImage = this.card?.masterData?.current?.masterVariant?.images[0]?.url || '';
    this.name = this.card?.masterData?.current?.name['en-US'] || '';

    this.getOriginalPrice();
    this.getDiscuntedPrice();
    this.formatPrice();
    this.getDiscountProcentage();
    this.addMainGif();
    this.getCategory();
  }

  addMainGif(): void {
    const gifPath = '/assets/gif/';
    if (this.card?.masterData?.current?.key) {
      const gifName = `${gifPath}${this.card?.masterData?.current?.key}.gif`;
      this.mainGif = gifName;
    }
    if (this.card?.key) {
      const gifName = `${gifPath}${this.card?.key}.gif`;
      this.mainGif = gifName;
    }
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

  getOriginalPrice() {
    const prices = this.card?.masterData?.current?.masterVariant?.prices;
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
      this.card?.masterData?.current?.masterVariant?.prices?.find((c) => c.value?.currencyCode != null)?.value
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

  onCardClick() {
    this.router.navigate(['/catalog', this.category, this.card.id]);
  }

  originalPriceStyles() {
    return {
      'justify-content': this.discountPercnt > 0 ? 'space-between' : 'flex-end',
    };
  }

  getCategory() {
    this.categoryObjects$ = this.store.select(selecCategories);
    this.categoryObjects$.subscribe((categories) => {
      if (this.card?.masterData?.current?.categories) {
        this.categoryID = this.card?.masterData?.current?.categories[0].id;
        const category = categories?.results.find((c) => c.id === this.categoryID);
        this.category = category?.name['en-US'].toLowerCase();
      }
    });
  }
}
