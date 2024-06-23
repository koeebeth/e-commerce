import { Component } from '@angular/core';
import { NgxFlickingModule, Plugin } from '@egjs/ngx-flicking';
import { AutoPlay, Fade, Pagination } from '@egjs/flicking-plugins';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgxFlickingModule, CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export default class SliderComponent {
  plugins: Plugin[] = [
    new AutoPlay({ duration: 5000, direction: 'NEXT', stopOnHover: false }),
    new Pagination({ type: 'bullet' }),
    new Fade(),
  ];

  images = [
    { src: '../../../../assets/overwatch3.jpeg', alt: 'Overwatch' },
    { src: '../../../../assets/overwatch.jpg', alt: 'Overwatch' },
    { src: '../../../../assets/overwatch2.jpeg', alt: 'Overwatch' },
    { src: '../../../../assets/overwatch1.jpeg', alt: 'Overwatch' },
  ];
}
