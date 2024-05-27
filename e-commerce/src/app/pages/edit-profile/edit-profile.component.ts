import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';
import { AppState } from '../../store/store';
import InputComponent from '../../shared/components/input/input.component';
import ButtonComponent from '../../shared/components/button/button.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [RouterLink, InputComponent, ButtonComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}
}
