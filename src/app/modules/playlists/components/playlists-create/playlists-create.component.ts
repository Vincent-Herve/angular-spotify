import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concatMap, map, ReplaySubject, Subject } from 'rxjs';
import { SpotifyService } from 'src/app/modules/shared/services/api/spotify.service';
import { AudioPlayerService } from 'src/app/modules/shared/services/audio-player/audio-player.service';
import { TokenStorageService } from 'src/app/modules/shared/services/token-storage/token-storage.service';

interface ITrack {
  name: string;
  uri: string;
}

@Component({
  selector: 'app-playlists-create',
  templateUrl: 'playlists-create.component.html',
  styleUrls: ['playlists-create.component.scss'],
})
export class PlaylistsCreateComponent implements OnInit {
  createForm: FormGroup;
  search: string;
  tracks$: Subject<ITrack[]> = new ReplaySubject();
  tracksToAddToNewPlaylist: ITrack[] = [];

  constructor(
    private fb: FormBuilder,
    private spotifyService: SpotifyService,
    private token: TokenStorageService,
    private audioPlayer: AudioPlayerService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  submit(): void {
    this.spotifyService
      .createUsersPlaylist(this.token.userId || '', {
        ...this.createForm.value,
      })
      .pipe(
        map((data) => data.id),
        concatMap((playlistId) =>
          this.spotifyService.addItemsToPlaylist(
            playlistId,
            this.tracksToAddToNewPlaylist.map((track) => track.uri)
          )
        )
      )
      .subscribe();
  }

  searchTracks(): void {
    this.spotifyService
      .searchTracks(this.search)
      .pipe(
        map((data) =>
          data.tracks.items.map((item: any) => ({
            name: item.name,
            uri: item.uri,
          }))
        )
      )
      .subscribe((res: ITrack[]) => this.tracks$.next(res));
  }

  setCurrentTrackToAudioPlayer(trackUri: string): void {
    this.audioPlayer.setCurrentTrack(trackUri.split(':')[2]);
  }

  editTracksToAddToNewPlaylist(event: MouseEvent, track: ITrack): void {
    event.stopPropagation();
    if (this.checkIfTrackIsIncludes(track)) {
      this.removeTrackToNewPlaylist(track);
    } else {
      this.addTrackToNewPlaylist(track);
    }
  }

  checkIfTrackIsIncludes(track: ITrack): boolean {
    return this.tracksToAddToNewPlaylist.some((item, i) => {
      return this.tracksToAddToNewPlaylist[i].uri === track.uri;
    });
  }

  private initForm(): void {
    this.createForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  private addTrackToNewPlaylist(track: ITrack): void {
    this.tracksToAddToNewPlaylist = [...this.tracksToAddToNewPlaylist, track];
  }

  private removeTrackToNewPlaylist(track: ITrack): void {
    this.tracksToAddToNewPlaylist = this.tracksToAddToNewPlaylist.filter(
      (item) => item.uri !== track.uri
    );
  }
}
