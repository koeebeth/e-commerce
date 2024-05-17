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

  @Input() form!: FormGroup;

  @Input() name: string = '';

  @Input() label: string = '';

  control!: FormControl;

  ngOnInit() {
    this.control = new FormControl('');
    this.form.addControl(this.name, this.control);
  }
}
