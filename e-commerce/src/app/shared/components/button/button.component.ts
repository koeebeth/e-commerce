import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export default class ButtonComponent {
  @Input() content: string = '';

  @Input() callbackFn: (e: Event) => void = () => {};

  @Input() btnClass: 'primary' | 'secondary' | 'link' | 'danger' = 'primary';

  @Input() isDisabled: boolean = false;
}
