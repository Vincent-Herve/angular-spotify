import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { authConfigParameters } from '../../configs/auth/auth.config';
import { authorizeUrl } from '../../constants/constant';
import { SpotifyService } from '../api/spotify.service';
import { TokenStorageService } from '../token-storage/token-storage.service';
import { AuthUtilsService } from './auth-utils.service';

@Injectable()
export class AuthService {
  constructor(
    private authUtils: AuthUtilsService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private spotifyService: SpotifyService
  ) {}

  get isLoggedIn(): boolean {
    return !!(this.tokenStorage.accessToken && this.tokenStorage.expiresAt);
  }

  redirectToSpotifyAuthorizeEndpoint(): void {
    const codeVerifier = this.authUtils.generateRandomString(64);

    this.authUtils
      .generateCodeChallenge(codeVerifier)
      .then((code_challenge) => {
        this.tokenStorage.saveCodeVerifier(codeVerifier);

        window.location.href = this.authUtils.generateUrlWithSearchParams(
          authorizeUrl,
          {
            ...authConfigParameters,
            code_challenge,
          }
        );
      });
  }

  exchangeToken(code: string) {
    const code_verifier = this.tokenStorage.codeVerifier || '';

    const body = new URLSearchParams({
      client_id: authConfigParameters['client_id'],
      grant_type: 'authorization_code',
      code,
      redirect_uri: authConfigParameters['redirect_uri'],
      code_verifier,
    });

    this.requestToken(body);
  }

  processTokenResponse(data: any) {
    const accessToken = data.access_token;
    const newDate = new Date();
    const expiresAt = newDate
      .setSeconds(newDate.getSeconds() + data.expires_in)
      .toString();

    this.tokenStorage.saveTokenResponse(accessToken, expiresAt);
  }

  private requestToken(body: any): void {
    this.spotifyService.requestToken(body).subscribe((data) => {
      this.processTokenResponse(data);

      this.router.navigate(['/home']);
    });
  }
}
