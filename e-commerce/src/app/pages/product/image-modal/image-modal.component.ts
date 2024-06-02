import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.scss',
})
export default class ImageModalComponent {
  @Input() images: string[] | undefined = [];

  @Input() selectedImage: string = '';

  @Output() closeModalEvent = new EventEmitter<void>();

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
