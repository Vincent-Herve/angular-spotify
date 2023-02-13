import { Component, Input, OnInit } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { SpotifyService } from 'src/app/modules/shared/services/api/spotify.service';
import { ITrack } from '../interfaces';

@Component({
  selector: 'app-playlists-track-search',
  templateUrl: 'playlists-track-search.component.html',
  styleUrls: ['playlists-track-search.component.scss'],
})
export class PlaylistsTrackSearchComponent implements OnInit {
  @Input() tracks$: ReplaySubject<ITrack[]>;

  search: string;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {}

  searchTracks(): void {
    this.spotifyService
      .searchTracks(this.search)
      .pipe(map(this.mapDataTracksToITrack))
      .subscribe((res: ITrack[]) => this.tracks$.next(res));
  }

  private mapDataTracksToITrack(data: any): ITrack[] {
    return data.tracks.items.map((item: any) => ({
      name: item.name,
      uri: item.uri,
    }));
  }
}
