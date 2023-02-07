import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    onSpotifyIframeApiReady: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-spotify';

  ngOnInit(): void {
    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      let element = document.getElementById('embed-iframe');
      let options = {
        uri: 'spotify:episode:7makk4oTQel546B0PZlDM5',
      };
      let callback = (EmbedController: any) => {};
      IFrameAPI.createController(element, options, callback);
    };
  }
}
