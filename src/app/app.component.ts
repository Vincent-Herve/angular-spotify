import { Component, OnInit } from '@angular/core';
import { DeviceDetectService } from './modules/shared/services/device-detect/device-detect.service';

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

  constructor(private deviceDetect: DeviceDetectService) {}

  ngOnInit(): void {
    this.deviceDetect.resizeWindow();
  }
}
