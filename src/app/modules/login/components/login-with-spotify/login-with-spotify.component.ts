import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';

@Component({
  selector: 'app-login-with-spotify',
  templateUrl: 'login-with-spotify.component.html',
})
export class LoginWithSpotifyComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  initLogin(code?: string): void {
    if (code) {
      this.authService.exchangeToken(code);
    } else if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  login(): void {
    this.authService.redirectToSpotifyAuthorizeEndpoint();
  }
}
