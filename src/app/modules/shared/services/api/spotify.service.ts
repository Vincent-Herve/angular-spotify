import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { meUrl, tokenUrl } from '../../constants/constant';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  }),
};

@Injectable()
export class SpotifyService {
  constructor(private http: HttpClient) {}

  requestToken(body: any): Observable<any> {
    return this.http.post(tokenUrl, body, httpOptions);
  }

  getUserData(): Observable<any> {
    return this.http.get(meUrl);
  }
}
