import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyService } from 'src/app/modules/shared/services/api/spotify.service';
import { TokenStorageService } from 'src/app/modules/shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  userData$: Observable<any>;

  constructor(
    private tokenStorage: TokenStorageService,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    this.userData$ = this.spotifyService.getUserData();
  }

  get accessToken(): string | null {
    return this.tokenStorage.accessToken;
  }

  get expiresAt(): Date {
    return this.tokenStorage.expiresAtDate;
  }
}
