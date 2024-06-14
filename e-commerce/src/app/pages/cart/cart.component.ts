import { Store } from '@ngrx/store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import ButtonComponent from '../../shared/components/button/button.component';
import { AppState } from '../../store/store';
import { selectAccessToken, selectAnonymousToken, selectCart } from '../../store/selectors';
import { LineItem, CartBase } from '../../shared/services/commercetoolsApi/apitypes';
import { Product } from '../../shared/services/products/productTypes';
import ProductsService from '../../shared/services/products/products.service';
import CartItemComponent from './cart-item/cart-item.component';

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

  productsInfo: (Product & LineItem)[] = [];

  promoCodeForm = new FormGroup({
    code: new FormControl(''),
  });

  constructor(
    private store: Store<AppState>,
    private productService: ProductsService,
  ) {}

  ngOnInit() {
    this.store.select(selectCart).subscribe((cart) => {
      if (cart) {
        this.cart = cart;
        this.products = cart.lineItems;
        this.store.select(selectAccessToken).subscribe((token) => {
          if (token) {
            this.productsInfo = [];
            this.products.forEach((product) => {
              const id = product.productId;
              this.productService.getProductById(id, token).subscribe((productInfo) => {
                const combinedProduct = { ...productInfo, ...product };
                this.productsInfo.push(combinedProduct);
              });
            });
          } else {
            this.store.select(selectAnonymousToken).subscribe((anonToken) => {
              if (anonToken) {
                this.productsInfo = [];
                this.products.forEach((product) => {
                  const id = product.productId;
                  this.productService.getProductById(id, token).subscribe((productInfo) => {
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

  onApplyPromo() {}
}
