import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-audio-player',
  templateUrl: 'audio-player.component.html',
  styleUrls: ['audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {
  testSubject = new Subject();

  constructor() {}

  ngOnInit() {
    this.loadSpotifyScript();
    this.handleSpotifyIframeApiReady();
  }

  testClick() {
    this.testSubject.next('');
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
      let options = {
        uri: 'spotify:episode:7makk4oTQel546B0PZlDM5',
      };
      /* let callback = (EmbedController: any) => {
        const button = document.getElementById('spotify-button');

        button?.addEventListener('click', () => {
          EmbedController.loadUri(button.dataset['spotifyId']);
        });
      }; */

      let callback = (EmbedController: any) => {};

      this.testSubject.subscribe(() => {
        IFrameAPI.createController(element, options, callback);
      });
    };
  }
}
