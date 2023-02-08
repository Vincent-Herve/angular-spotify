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

  ngOnInit(): void {}
}
