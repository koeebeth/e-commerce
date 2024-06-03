import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export default class CategoriesComponent {
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
    {
      categoryName: 'SIMULATION',
      image: '../../../assets/FC24.jpeg',
      alt: 'simulation',
      query: 'simulation',
    },
    {
      categoryName: 'ADVENTURE',
      image: '../../../assets/adventure.jpg',
      alt: 'adventure',
      query: 'adventure',
    },
  ];
}