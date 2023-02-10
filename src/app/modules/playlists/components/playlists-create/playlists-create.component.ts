import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, concatMap, map } from 'rxjs';
import { SpotifyService } from 'src/app/modules/shared/services/api/spotify.service';
import { AudioPlayerService } from 'src/app/modules/shared/services/audio-player/audio-player.service';
import { TokenStorageService } from 'src/app/modules/shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-playlists-create',
  templateUrl: 'playlists-create.component.html',
  styleUrls: ['playlists-create.component.scss'],
})
export class PlaylistsCreateComponent implements OnInit {
  createForm: FormGroup;
  search: string;
  tracks$: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(
    private fb: FormBuilder,
    private spotifyService: SpotifyService,
    private token: TokenStorageService,
    private audioPlayer: AudioPlayerService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.tracks$.subscribe((data) => console.log(data));
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
            this.tracks$.getValue().map((track: any) => track.uri)
          )
        )
      );
  }

  searchTracks(): void {
    console.log(this.search);
    this.spotifyService
      .searchTracks(this.search)
      .pipe(map((data) => data.tracks.items))
      .subscribe((res) => this.tracks$.next(res));
  }

  setCurrentTrackToAudioPlayer(track: string): void {
    console.log(track);
    this.audioPlayer.setCurrentTrack(track);
  }

  private initForm(): void {
    this.createForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
    });
  }
}
