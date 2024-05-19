import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { appStore } from './store/store';
import routes from './app.routes';
import EcommerceEffects from './store/effects';

const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideStore(appStore),
    provideEffects(EcommerceEffects),
  ],
};
export default appConfig;
