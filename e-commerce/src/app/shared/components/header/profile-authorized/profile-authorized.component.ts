import { Component } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import * as actions from '../../../../store/actions';
import { AppState } from '../../../../store/store';

@Component({
  selector: 'app-profile-authorized',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-authorized.component.html',
  styleUrl: './profile-authorized.component.scss',
})
export default class ProfileAuthorizedComponent {
  constructor(private store: Store<AppState>) {}

  onLogout() {
    this.store.dispatch(actions.logout());
  }
}
