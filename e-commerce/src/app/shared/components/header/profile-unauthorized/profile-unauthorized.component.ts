import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as actions from '../../../../store/actions';

@Component({
  selector: 'app-profile-unauthorized',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-unauthorized.component.html',
  styleUrl: './profile-unauthorized.component.scss',
})
export default class ProfileUnauthorizedComponent {
  constructor(private store: Store) {}

  onLogin() {
    this.store.dispatch(actions.loadAnonymousToken());
  }
}
