import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import CommerceApiService from './shared/services/commercetoolsApi/commercetoolsapi.service';
import SharedModule from './shared/shared.module';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './store/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export default class AppComponent {
  title = 'e-commerce';

  token$!: Observable<string>;
  isLoading$!: Observable<boolean>;

  constructor(
    private commerceApiService: CommerceApiService,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.commerceApiService.checkTokens();

    // usage example the store in components :
    this.token$ = this.store.select((state) => state.app.anonymousToken);
    this.isLoading$ = this.store.select((state) => state.app.loading);
  }
}
