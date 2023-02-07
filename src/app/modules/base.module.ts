import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [HttpClientModule, PagesModule, LoginModule, SharedModule],
  exports: [],
  declarations: [],
  providers: [],
})
export class BaseModule {}
