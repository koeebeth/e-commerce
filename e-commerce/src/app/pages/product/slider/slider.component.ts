import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class SliderComponent {
  images = [
    { src: '../../../../assets/banishers.jpeg', alt: 'Banishers' },
    { src: '../../../../assets/banishers1.jpg', alt: 'Banishers' },
    { src: '../../../../assets/banishers2.jpg', alt: 'Banishers' },
  ];
}
