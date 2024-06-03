import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss',
})
export default class SelectInputComponent {
  @Input() optList: string[] = [];

  @Input() value: string = '';

  @Input() form!: FormGroup;

  @Input() name: string = '';

  @Input() label: string = '';

  control!: FormControl;

  defaultValueIndex = 0;

  ngOnInit() {
    this.defaultValueIndex = this.value ? this.optList.indexOf(this.value) : 0;
    this.control = new FormControl(this.optList[this.defaultValueIndex] || '');
    this.form.addControl(this.name, this.control);
  }
}
