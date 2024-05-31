import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import SliderComponent from './slider/slider.component';
import { AppState } from '../../store/store';
import * as actions from '../../store/actions';
import { Product, ProductPagedQueryResponse } from '../../shared/services/products/productTypes';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SliderComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export default class ProductComponent {
  productObjects$!: Observable<ProductPagedQueryResponse | null>;

  productResponse!: ProductPagedQueryResponse;

  product!: Product | undefined;

  name: string = '';

  description: string = '';

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    register();
  }

  ngOnInit() {
    this.store.dispatch(actions.loadProducts({ offset: 0, limit: 13 }));
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.store
        .select((state) => state.app.products)
        .subscribe((products) => {
          this.product = products?.results.find((p) => p.id === productId);
          if (this.product) {
            this.name = this.product?.masterData?.current?.name['en-US'] || '';
            if (this.product?.masterData?.current?.description) {
              this.description = this.product?.masterData?.current?.description['en-US'] || '';
            }
          }
        });
    });
  }
}
