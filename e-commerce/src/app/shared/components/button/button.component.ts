import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export default class ButtonComponent {
  @Input() content: string = '';

  @Input() btnType: 'primary' | 'secondary' | 'link' | 'danger' = 'primary';

  @Input() isDisabled: boolean = false;

  @Input() btnClass = '';

  @Output() clickHandler = new EventEmitter();

  handleClick() {
    this.clickHandler.emit();
  }
}
