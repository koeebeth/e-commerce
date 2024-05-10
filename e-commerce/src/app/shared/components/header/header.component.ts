import { Component } from '@angular/core';
import BurgerMenuComponent from './burger-menu/burger-menu.component';
import ProfileAuthorizedComponent from './profile-authorized/profile-authorized.component';
import ProfileUnauthorizedComponent from './profile-unauthorized/profile-unauthorized.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BurgerMenuComponent, ProfileAuthorizedComponent, ProfileUnauthorizedComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export default class HeaderComponent {}
