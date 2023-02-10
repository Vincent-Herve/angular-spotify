import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '../login/login.module';
import { PlaylistsModule } from '../playlists/playlists.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PlaylistsCreatePageComponent } from './components/playlists-create-page/playlists-create-page.component';
import { PlaylistsDetailPageComponent } from './components/playlists-detail-page/playlists-detail-page.component';
import { PlaylistsPageComponent } from './components/playlists-page/playlists-page.component';

@NgModule({
  imports: [CommonModule, LoginModule, PlaylistsModule],
  exports: [],
  declarations: [
    LoginPageComponent,
    HomePageComponent,
    PlaylistsPageComponent,
    PlaylistsCreatePageComponent,
    PlaylistsDetailPageComponent,
  ],
  providers: [],
})
export class PagesModule {}
