import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, map, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { SpotifyService } from 'src/app/modules/shared/services/api/spotify.service';
import { DeviceDetectService } from 'src/app/modules/shared/services/device-detect/device-detect.service';
import { TokenStorageService } from 'src/app/modules/shared/services/token-storage/token-storage.service';
import { ITrack } from '../interfaces';
import { PlaylistsTrackListComponent } from '../playlists-track-list/playlists-track-list.component';

@Component({
  selector: 'app-playlists-create',
  templateUrl: 'playlists-create.component.html',
  styleUrls: ['playlists-create.component.scss'],
})
export class PlaylistsCreateComponent implements OnInit, OnDestroy {
  @ViewChild(PlaylistsTrackListComponent)
  playlistsTrackList: PlaylistsTrackListComponent;

  createForm: FormGroup;
  tracks$: ReplaySubject<ITrack[]> = new ReplaySubject();
  tracksToAddToNewPlaylist: ITrack[] = [];
  createdPlaylistError = false;
  destroy$: Subject<boolean> = new Subject();

  constructor(
    public deviceDetect: DeviceDetectService,
    private fb: FormBuilder,
    private spotifyService: SpotifyService,
    private token: TokenStorageService,
    private router: Router
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
      .subscribe({
        next: () => this.router.navigate(['/playlists']),
        error: () => {
          this.createdPlaylistError = true;
          setTimeout(() => {
            this.createdPlaylistError = false;
          }, 2000);
        },
      });
  }

  handleTracksArrayEdited(tracksToAddToNewPlaylist: ITrack[]): void {
    this.tracksToAddToNewPlaylist = tracksToAddToNewPlaylist;
  }

  private initForm(): void {
    this.createForm = this.fb.group({
      name: [null, Validators.required],
      description: null,
    });
  }
}
