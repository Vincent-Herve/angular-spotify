import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from 'src/app/modules/shared/services/api/spotify.service';

@Component({
  selector: 'app-playlists-detail',
  templateUrl: 'playlists-detail.component.html',
  styleUrls: ['playlists-detail.component.scss'],
})
export class PlaylistsDetailComponent implements OnInit {
  playlist$: Observable<any>;

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getOnePlaylist();
  }

  getOnePlaylist(): void {
    const id = this.route.snapshot.params['id'];
    this.playlist$ = this.spotifyService.getOnePlaylist(id || '');
  }
}
