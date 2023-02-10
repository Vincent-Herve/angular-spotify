import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyService } from 'src/app/modules/shared/services/api/spotify.service';
import { TokenStorageService } from 'src/app/modules/shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-playlists-list',
  templateUrl: 'playlists-list.component.html',
  styleUrls: ['playlists-list.component.scss'],
})
export class PlaylistsListComponent implements OnInit {
  playlists$: Observable<any>;

  constructor(
    private spotifyService: SpotifyService,
    private token: TokenStorageService
  ) {}

  ngOnInit() {
    this.playlists$ = this.spotifyService.getUsersPlaylists(
      this.token.userId || ''
    );
  }
}
