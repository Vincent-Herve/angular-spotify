import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UserStateService {
  userState = new Subject();

  constructor() {}
}
