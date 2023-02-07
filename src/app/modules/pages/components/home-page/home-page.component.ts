import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/modules/shared/services/api/spotify.service';
import { TokenStorageService } from 'src/app/modules/shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: 'home-page.component.html',
})
export class HomePageComponent implements OnInit {
  userData: any;

  constructor(
    private tokenStorage: TokenStorageService,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    this.spotifyService
      .getUserData()
      .subscribe((data) => (this.userData = data));
  }

  get accessToken(): string | null {
    return this.tokenStorage.accessToken;
  }

  get expiresAt(): Date {
    return this.tokenStorage.expiresAtDate;
  }
}
