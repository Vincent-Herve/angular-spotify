import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AudioPlayerModule } from '../audio-player/audio-player.module';
import { AuthGuard } from './guards/auth/auth.guard';
import { authInterceptor } from './interceptors/auth/auth.interceptor';
import { SpotifyService } from './services/api/spotify.service';
import { AuthUtilsService } from './services/auth/auth-utils.service';
import { AuthService } from './services/auth/auth.service';
import { TokenStorageService } from './services/token-storage/token-storage.service';
import { UtilsService } from './services/utils/utils.service';
import { HeaderComponent } from './ui/layout/header/header.component';
import { LayoutComponent } from './ui/layout/layout.component';

const providers = [
  AuthService,
  AuthUtilsService,
  TokenStorageService,
  AuthGuard,
  SpotifyService,
  UtilsService,
  authInterceptor,
];

@NgModule({
  imports: [AppRoutingModule, AudioPlayerModule],
  exports: [],
  declarations: [LayoutComponent, HeaderComponent],
  providers,
})
export class SharedModule {}
