import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth/auth.guard';
import { authInterceptor } from './interceptors/auth/auth.interceptor';
import { SpotifyService } from './services/api/spotify.service';
import { AudioPlayerService } from './services/audio-player/audio-player.service';
import { AuthUtilsService } from './services/auth/auth-utils.service';
import { AuthService } from './services/auth/auth.service';
import { DeviceDetectService } from './services/device-detect/device-detect.service';
import { TokenStorageService } from './services/token-storage/token-storage.service';
import { UtilsService } from './services/utils/utils.service';

const providers = [
  AuthService,
  AuthUtilsService,
  TokenStorageService,
  AuthGuard,
  SpotifyService,
  UtilsService,
  AudioPlayerService,
  DeviceDetectService,
  authInterceptor,
];

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers,
})
export class SharedModule {}
