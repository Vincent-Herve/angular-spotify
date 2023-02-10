import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AudioPlayerService {
  currentTrack: BehaviorSubject<string> = new BehaviorSubject(
    'spotify:episode:7makk4oTQel546B0PZlDM5'
  );

  constructor() {}

  setCurrentTrack(trackId: string) {
    this.currentTrack.next(trackId);
  }
}
