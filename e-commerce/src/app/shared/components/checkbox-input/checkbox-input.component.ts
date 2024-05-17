import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkbox-input.component.html',
  styleUrl: './checkbox-input.component.scss',
})
export class CheckboxInputComponent {
  @Input() form!: FormGroup;

  @Input() name: string = '';

  @Input() label: string = '';

  @Input() checked: boolean = false;

  @Output() checkHandler = new EventEmitter();

  control!: FormControl;

  ngOnInit() {
    this.control = new FormControl('');
    this.form.addControl(this.name, this.control);
  }

  handleCheck() {
    this.checkHandler.emit();
  }
}
