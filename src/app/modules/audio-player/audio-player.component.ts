import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: 'audio-player.component.html',
  styleUrls: ['audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.loadSpotifyScript();
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
}
