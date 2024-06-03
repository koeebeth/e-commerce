import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import SliderComponent from './slider/slider.component';
import CatalogComponent from './catalog/catalog.component';
import { AppState } from '../../store/store';
import * as actions from '../../store/actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SliderComponent, CommonModule, CatalogComponent, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export default class MainComponent {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(actions.loadProducts({ offset: 0, limit: 5 }));
  }

  categories = [
    {
      categoryName: 'ACTION',
      image: '../../../assets/eldenring.jpeg',
      alt: 'action',
      query: 'action',
    },
    {
      categoryName: 'RPG',
      image: '../../../assets/conan.jpeg',
      alt: 'rpg',
      query: 'rpg',
    },
    {
      categoryName: 'STRATEGY',
      image: '../../../assets/stellaris.jpeg',
      alt: 'strategy',
      query: 'strategy',
    },
  ];
}
