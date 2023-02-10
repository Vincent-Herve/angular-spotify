import { Component, OnInit } from '@angular/core';
import { AudioPlayerService } from '../shared/services/audio-player/audio-player.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: 'audio-player.component.html',
  styleUrls: ['audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {
  constructor(private audioPlayer: AudioPlayerService) {}

  ngOnInit() {
    this.loadSpotifyScript();
    this.handleSpotifyIframeApiReady();

    this.audioPlayer.currentTrack.subscribe((trackId) => {
      this.editIFrameSrcAttribute(trackId);
    });
  }

  private loadSpotifyScript() {
    let spotifyScriptEl = document.getElementById('spotify-script');

    if (spotifyScriptEl) return;

    let spotifyScript = document.createElement('script');
    spotifyScript.id = 'spotify-script';
    spotifyScript.type = 'text/javascript';
    spotifyScript.async = true;
    spotifyScript.src = 'https://open.spotify.com/embed-podcast/iframe-api/v1';
    document.body.appendChild(spotifyScript);
  }

  private handleSpotifyIframeApiReady(): void {
    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      let element = document.getElementById('embed-iframe');
      let callback = (EmbedController: any) => {
        EmbedController.loadUri('spotify:episode:7makk4oTQel546B0PZlDM5');
      };
      let options = {};

      IFrameAPI.createController(element, options, callback);
    };
  }

  private editIFrameSrcAttribute(trackId: string): void {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.src = `https://open.spotify.com/embed/track/${trackId}`;
    }
  }
}
