import { NgModule } from '@angular/core';
import CommerceApiService from './services/commercetoolsApi/commercetoolsapi.service';
import TokenStorageService from './services/tokenStorage/tokenstorage.service';

@NgModule({
  imports: [],
  providers: [CommerceApiService, TokenStorageService],
})
export default class SharedModule {}
