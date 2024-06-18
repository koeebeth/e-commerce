import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store';
import BurgerMenuComponent from './burger-menu/burger-menu.component';
import ProfileAuthorizedComponent from './profile-authorized/profile-authorized.component';
import ProfileUnauthorizedComponent from './profile-unauthorized/profile-unauthorized.component';
import { selectCart } from '../../../store/selectors';
import { CartBase } from '../../services/commercetoolsApi/apitypes';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, BurgerMenuComponent, ProfileAuthorizedComponent, ProfileUnauthorizedComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export default class HeaderComponent {
  authToken$!: Observable<string>;
  cart: CartBase | null = null;
  itemsCount: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.authToken$ = this.store.select((state) => state.app.accessToken);
    this.store.select(selectCart).subscribe((cart) => {
      if (cart) {
        this.cart = cart;
        this.showCountItems();
      }
    });
  }

  showCountItems() {
    this.itemsCount = 0;
    this.cart?.lineItems.forEach((item) => {
      this.itemsCount += item.quantity;
    });
  }
}
