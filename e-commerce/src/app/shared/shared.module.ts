import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import CommerceApiService from './services/commercetoolsApi/commercetoolsapi.service';
import TokenStorageService from './services/tokenStorage/tokenstorage.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [CommerceApiService, TokenStorageService],
})
export default class SharedModule {}
