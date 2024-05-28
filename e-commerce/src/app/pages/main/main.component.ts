import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import SliderComponent from './slider/slider.component';
import { CatalogComponent } from './catalog/catalog.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SliderComponent, CommonModule, CatalogComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export default class MainComponent {
  categories = [
    {
      categoryName: 'ACTION',
      image: '../../../assets/eldenring.jpeg',
      alt: 'action',
    },
    {
      categoryName: 'RPG',
      image: '../../../assets/conan.jpeg',
      alt: 'rpg',
    },
    {
      categoryName: 'STRATEGY',
      image: '../../../assets/stellaris.jpeg',
      alt: 'strategy',
    },
    {
      categoryName: 'SIMULATION',
      image: '../../../assets/FC24.jpeg',
      alt: 'simulation',
    },
  ];
}
