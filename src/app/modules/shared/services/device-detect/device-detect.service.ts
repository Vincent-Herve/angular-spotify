import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, ReplaySubject } from 'rxjs';

@Injectable()
export class DeviceDetectService {
  isMobile$: BehaviorSubject<boolean> = new BehaviorSubject(
    window.innerWidth <= 768
  );

  constructor() {}

  resizeWindow(): void {
    fromEvent(window, 'resize').subscribe(() => {
      this.setIsMobile(window.innerWidth <= 768);
    });
  }

  private setIsMobile(value: boolean): void {
    this.isMobile$.next(value);
  }
}
