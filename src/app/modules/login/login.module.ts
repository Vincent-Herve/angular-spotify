import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginWithSpotifyComponent } from './components/login-with-spotify/login-with-spotify.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoginWithSpotifyComponent],
  exports: [LoginWithSpotifyComponent],
  providers: [],
})
export class LoginModule {}
