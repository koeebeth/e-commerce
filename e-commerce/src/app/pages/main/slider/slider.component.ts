import { Component } from '@angular/core';
import { NgxFlickingModule, Plugin } from '@egjs/ngx-flicking';
import { AutoPlay, Fade, Pagination } from '@egjs/flicking-plugins';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgxFlickingModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export default class SliderComponent {
  plugins: Plugin[] = [
    new AutoPlay({ duration: 5000, direction: 'NEXT', stopOnHover: false }),
    new Pagination({ type: 'bullet' }),
    new Fade(),
  ];
}
