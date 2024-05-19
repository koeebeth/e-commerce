import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import ButtonComponent from '../../shared/components/button/button.component';
import { AppState } from '../../store/store';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ButtonComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export default class RegistrationComponent {
  authToken$!: Observable<string>;

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
