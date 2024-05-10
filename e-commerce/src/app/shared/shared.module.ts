import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/commercetoolsApi/commercetoolsapi.service';

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [AuthService],
})
export class SharedModule {}
