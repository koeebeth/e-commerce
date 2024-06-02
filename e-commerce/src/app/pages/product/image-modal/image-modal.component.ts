import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperContainer } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class ImageModalComponent {
  @Input() images: string[] | undefined = [];

  @Input() selectedImage: string = '';

  @Input() name: string = '';

  @Output() closeModalEvent = new EventEmitter<void>();

  @ViewChild('swiperContainer', { static: true }) swiperContainer!: ElementRef<SwiperContainer>;

  initialSlide: number = 0;

  ngOnInit(): void {
    const selectedImageIndex = this.images?.indexOf(this.selectedImage);
    this.initialSlide = selectedImageIndex ?? 0;
    const swiperOptions: SwiperOptions = {
      initialSlide: this.initialSlide,
    };
    Object.assign(this.swiperContainer.nativeElement, swiperOptions);
    this.swiperContainer.nativeElement.initialize();
  }

  close() {
    this.closeModalEvent.emit();
  }

  closeModalOutsideClick(event: Event) {
    const mouseEvent = event as MouseEvent;
    const target = mouseEvent.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.close();
    }
  }
}
