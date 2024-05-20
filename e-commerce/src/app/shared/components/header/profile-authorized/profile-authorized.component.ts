import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../../../../store/actions';

@Component({
  selector: 'app-profile-authorized',
  standalone: true,
  imports: [],
  templateUrl: './profile-authorized.component.html',
  styleUrl: './profile-authorized.component.scss',
})
export default class ProfileAuthorizedComponent {
  constructor(private store: Store) {}

  onLogout() {
    this.store.dispatch(actions.logout());
  }
}
