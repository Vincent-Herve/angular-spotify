import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '../login/login.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PlaylistPageComponent } from './components/playlist-page/playlist-page.component';

@NgModule({
  imports: [CommonModule, LoginModule],
  exports: [],
  declarations: [LoginPageComponent, HomePageComponent, PlaylistPageComponent],
  providers: [],
})
export class PagesModule {}
