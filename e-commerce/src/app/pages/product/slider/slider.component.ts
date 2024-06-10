import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import ImageModalComponent from '../image-modal/image-modal.component';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, ImageModalComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class SliderComponent {
  @Input() images: string[] | undefined = [];

  @Input() name: string = '';

  selectedImage: string = '';

  openModal(image: string) {
    this.selectedImage = image;
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.selectedImage = '';
    document.body.classList.remove('modal-open');
  }
}
