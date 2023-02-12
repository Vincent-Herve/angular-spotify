import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concatMap, map, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { SpotifyService } from 'src/app/modules/shared/services/api/spotify.service';
import { AudioPlayerService } from 'src/app/modules/shared/services/audio-player/audio-player.service';
import { DeviceDetectService } from 'src/app/modules/shared/services/device-detect/device-detect.service';
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
export class PlaylistsCreateComponent implements OnInit, OnDestroy {
  createForm: FormGroup;
  search: string;
  tracks$: Subject<ITrack[]> = new ReplaySubject();
  tracksToAddToNewPlaylist: ITrack[] = [];
  destroy$: Subject<boolean> = new Subject();

  constructor(
    public deviceDetect: DeviceDetectService,
    private fb: FormBuilder,
    private spotifyService: SpotifyService,
    private token: TokenStorageService,
    private audioPlayer: AudioPlayerService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  get name() {
    return this.createForm.get('name')!;
  }

  submit(): void {
    this.spotifyService
      .createUsersPlaylist(this.token.userId || '', {
        ...this.createForm.value,
      })
      .pipe(
        takeUntil(this.destroy$),
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
      .pipe(takeUntil(this.destroy$), map(this.mapDataTracksToITrack))
      .subscribe((res: ITrack[]) => this.tracks$.next(res));
  }

  setCurrentTrackToAudioPlayer(trackUri: string): void {
    this.audioPlayer.setCurrentTrack(this.fromTrackUriToTrackId(trackUri));
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
      description: null,
    });
  }

  private fromTrackUriToTrackId(trackUri: string): string {
    return trackUri.split(':')[2];
  }

  private mapDataTracksToITrack(data: any): ITrack[] {
    return data.tracks.items.map((item: any) => ({
      name: item.name,
      uri: item.uri,
    }));
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
