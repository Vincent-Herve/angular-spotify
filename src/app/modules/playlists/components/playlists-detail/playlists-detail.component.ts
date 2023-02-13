import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { SpotifyService } from 'src/app/modules/shared/services/api/spotify.service';
import { ITrack } from '../interfaces';

@Component({
  selector: 'app-playlists-detail',
  templateUrl: 'playlists-detail.component.html',
  styleUrls: ['playlists-detail.component.scss'],
})
export class PlaylistsDetailComponent implements OnInit {
  playlist$: Observable<any>;
  tracks$: ReplaySubject<ITrack[]> = new ReplaySubject();

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getOnePlaylist();
  }

  getOnePlaylist(): void {
    const id = this.route.snapshot.params['id'];
    this.playlist$ = this.spotifyService.getOnePlaylist(id || '').pipe(
      tap((data: any) => {
        this.tracks$.next(this.mapDataTracksToITrack(data));
      })
    );
  }

  private mapDataTracksToITrack(data: any): ITrack[] {
    return data.tracks.items.map((item: any) => ({
      name: item.track.name,
      uri: item.track.uri,
    }));
  }
}
