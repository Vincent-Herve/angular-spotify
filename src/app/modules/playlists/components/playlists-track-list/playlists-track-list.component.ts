import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AudioPlayerService } from 'src/app/modules/shared/services/audio-player/audio-player.service';
import { ITrack } from '../interfaces';

@Component({
  selector: 'app-playlists-track-list',
  templateUrl: 'playlists-track-list.component.html',
  styleUrls: ['playlists-track-list.component.scss'],
})
export class PlaylistsTrackListComponent implements OnInit {
  @Input() tracks$: ReplaySubject<ITrack[]>;
  @Input() tracksArray: ITrack[] = [];
  @Input() onlyList = true;

  @Output() tracksArrayEdited: EventEmitter<ITrack[]> = new EventEmitter();

  constructor(private audioPlayer: AudioPlayerService) {}

  ngOnInit() {}

  setCurrentTrackToAudioPlayer(trackUri: string): void {
    this.audioPlayer.setCurrentTrack(this.fromTrackUriToTrackId(trackUri));
  }

  editTracksArray(event: MouseEvent, track: ITrack): void {
    event.stopPropagation();
    if (this.checkIfTrackIsIncludes(track)) {
      this.removeTrackToTrackArray(track);
    } else {
      this.addTrackToTrackArray(track);
    }
  }

  checkIfTrackIsIncludes(track: ITrack): boolean {
    return this.tracksArray.some((item, i) => {
      return this.tracksArray[i].uri === track.uri;
    });
  }

  private fromTrackUriToTrackId(trackUri: string): string {
    return trackUri.split(':')[2];
  }

  private addTrackToTrackArray(track: ITrack): void {
    this.tracksArray = [...this.tracksArray, track];
    this.tracksArrayEdited.emit(this.tracksArray);
  }

  private removeTrackToTrackArray(track: ITrack): void {
    this.tracksArray = this.tracksArray.filter(
      (item) => item.uri !== track.uri
    );
    this.tracksArrayEdited.emit(this.tracksArray);
  }
}
