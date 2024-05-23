import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import ButtonComponent from '../../shared/components/button/button.component';
import { AppState } from '../../store/store';
import LoginFormComponent from './login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ButtonComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  ngOnInit() {
    this.store
      .select((state) => state.app.accessToken)
      .subscribe((accessToken) => {
        if (accessToken) {
          this.router.navigate(['/main']);
        }
      });
  }
}
