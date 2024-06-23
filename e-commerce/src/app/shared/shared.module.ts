import { NgModule } from '@angular/core';
import CommerceApiService from './services/commercetoolsApi/commercetoolsapi.service';
import LocalStorageService from './services/localStorage/localstorage.service';

@NgModule({
  imports: [],
  providers: [CommerceApiService, LocalStorageService],
})
export default class SharedModule {}
