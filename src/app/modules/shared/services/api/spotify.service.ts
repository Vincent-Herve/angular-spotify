import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  addItemsToPlaylist,
  meUrl,
  onePlaylistUrl,
  postUsersPlaylistUrl,
  tokenUrl,
  getUsersPlaylistsUrl,
  searchTracksUrl,
} from '../../constants/constant';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  }),
};

@Injectable()
export class SpotifyService {
  constructor(private http: HttpClient) {}

  requestToken(body: URLSearchParams): Observable<any> {
    return this.http.post(tokenUrl, body, httpOptions);
  }

  getUserData(): Observable<any> {
    return this.http.get(meUrl);
  }

  getUsersPlaylists(userId: string): Observable<any> {
    return this.http.get(getUsersPlaylistsUrl(userId));
  }

  getOnePlaylist(playlistId: string): Observable<any> {
    return this.http.get(onePlaylistUrl(playlistId));
  }

  createUsersPlaylist(userId: string, body: any): Observable<any> {
    return this.http.post(postUsersPlaylistUrl(userId), body);
  }

  addItemsToPlaylist(playlistId: string, uris: string[]): Observable<any> {
    return this.http.post(addItemsToPlaylist(playlistId), { uris });
  }

  searchTracks(queryParam: string): Observable<any> {
    return this.http.get(searchTracksUrl(queryParam));
  }
}
