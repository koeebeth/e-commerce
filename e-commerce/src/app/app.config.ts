import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import routes from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { appStore, appEffects } from './store/store';
import { HttpClientModule } from '@angular/common/http';

const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideStore(appStore),
    provideEffects(appEffects),
  ],
};
export default appConfig;
