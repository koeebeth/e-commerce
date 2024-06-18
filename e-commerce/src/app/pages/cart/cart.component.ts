import { Store } from '@ngrx/store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import ButtonComponent from '../../shared/components/button/button.component';
import { AppState } from '../../store/store';
import { selectAccessToken, selectAnonymousToken, selectCart, selectDiscounts } from '../../store/selectors';
import { LineItem, CartBase } from '../../shared/services/commercetoolsApi/apitypes';
import { DiscountCode, Product } from '../../shared/services/products/productTypes';
import ProductsService from '../../shared/services/products/products.service';
import CartItemComponent from './cart-item/cart-item.component';
import * as actions from '../../store/actions';
import { Observable, forkJoin } from 'rxjs';
import LocalStorageService from '../../shared/services/localStorage/localstorage.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, ReactiveFormsModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export default class CartComponent {
  cart: CartBase | null = null;
  products: LineItem[] = [];
  promoCodes: DiscountCode[] | null = null;
  productsInfo: (Product & LineItem)[] = [];
  isPromoApplied: boolean = false;
  promoCodeForm = new FormGroup({
    code: new FormControl(''),
  });
  promoCodeValue: string = '';
  promoCodeId: string = '';

  constructor(
    private store: Store<AppState>,
    private productService: ProductsService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit() {
    this.promoCodeValue = this.localStorageService.getPromoCode() || '';

    this.store.select(selectDiscounts).subscribe((discounts) => {
      if (discounts) {
        this.promoCodes = discounts.results;
      }
    });

    this.store.select(selectCart).subscribe((cart) => {
      if (cart) {
        this.cart = cart;
        this.products = cart.lineItems;
        this.store.select(selectAccessToken).subscribe((token) => {
          if (token) {
            this.productsInfo = [];
            forkJoin(
              this.products.map((product) => this.productService.getProductById(product.productId, token)),
            ).subscribe((productsInfo) => {
              productsInfo.forEach((productInfo, i) => {
                const combinedProduct = { ...productInfo, ...this.products[i] };
                this.productsInfo.push(combinedProduct);
              });
              this.checkPromoApplyed();
            });
          } else {
            this.store.select(selectAnonymousToken).subscribe((anonToken) => {
              if (anonToken) {
                this.productsInfo = [];
                this.products.forEach((product) => {
                  const id = product.productId;
                  this.productService.getProductById(id, anonToken).subscribe((productInfo) => {
                    const combinedProduct = { ...productInfo, ...product };
                    this.productsInfo.push(combinedProduct);
                  });
                });
              }
            });
          }
        });
      }
    });
  }

  calcTotal(): string {
    const total = this.cart!.totalPrice.centAmount;
    return (total / 100).toFixed(2);
  }

  calcOrigTotal(): string {
    const origTotal = this.cart?.lineItems.reduce((acc, item) => acc + item.price.value.centAmount * item.quantity, 0);
    return (origTotal! / 100).toFixed(2);
  }

  onApplyPromo() {
    this.promoCodeValue = this.promoCodeForm.get('code')?.value ?? '';
    this.localStorageService.savePromoCode(this.promoCodeValue);

    if (this.cart) {
      this.store.dispatch(
        actions.applyDiscount({
          cartId: this.cart.id,
          action: 'add',
          discountCode: this.promoCodeValue,
          cartVersion: this.cart.version,
        }),
      );
    }
  }

  onRemovePromo() {
    this.promoCodeId = this.promoCodes?.find((discount) => discount.code === this.promoCodeValue)?.id ?? '';
    console.log('promoCodeId', this.promoCodeId);
    if (this.cart?.lineItems) {
      this.store.dispatch(
        actions.applyDiscount({
          cartId: this.cart.id,
          action: 'remove',
          discountCodeId: this.promoCodeId,
          cartVersion: this.cart.version,
        }),
      );
    }

    this.localStorageService.clearPromoCode();
  }

  checkPromoApplyed() {
    this.isPromoApplied = this.cart?.lineItems.some((item) => item.discountedPricePerQuantity.length > 0) ?? false;
  }
}
