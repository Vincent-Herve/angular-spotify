import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '../login/login.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
  imports: [CommonModule, LoginModule],
  exports: [],
  declarations: [LoginPageComponent, HomePageComponent],
  providers: [],
})
export class PagesModule {}
