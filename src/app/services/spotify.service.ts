import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Spotify from 'spotify-web-api-js'
import { IUser } from '../interfaces/user';
import { DefineSpotifyArtist, DefineSpotifyPlaylist, DefineSpotifyTrack, DefineSpotifyUser } from '../common/helpers/spotify.helper';
import { IPlaylist } from '../interfaces/playlist';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IArtist } from '../interfaces/artists';
import { IMusic } from '../interfaces/music';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  user!: IUser;
  private spotifyApi!: Spotify.SpotifyWebApiJs;
  private playlists$: BehaviorSubject<IPlaylist[]> = new BehaviorSubject<IPlaylist[]>([]);
  private topArtists$: BehaviorSubject<IArtist[]> = new BehaviorSubject<IArtist[]>([]);
  private savedMusics$: BehaviorSubject<IMusic[]> = new BehaviorSubject<IMusic[]>([]);

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async initializeUser(): Promise<boolean> {
    const token = this.getTokenFromStorage();

    if (!!this.user) return true;
    if (!token) return false;

    try {
      this.defineAccessToken({ token });
      await this.getSpotifyUserData();
      return !!this.user;
    } catch (error) {
      return false;
    }

  }

  async getSpotifyUserData() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = DefineSpotifyUser({ user: userInfo });
  }

  getLoginUrl(): string {
    const authEndpoint = `${environment.authEndpoint}?`;
    const clientId = `client_id=${environment.clientId}&`;
    const redirectUrl = `redirect_uri=${environment.redirectUrl}&`;
    const scopes = `scope=${environment.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;

    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  getTokenFromStorage(): string {
    return localStorage.getItem('token') || '';
  }

  getToken(): string {
    const token = this.getTokenFromStorage();
    const hash = window.location.hash

    if (!hash && !token) return '';

    if (token) return token;
    return hash.substring(1).split('&')[0].split('=')[1];
  }

  defineAccessToken({ token }: { token: string }): void {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  getUserPlaylistFromSpotify({ offset = 0, limit = 50 }): void {
    this.spotifyApi.getUserPlaylists(this.user.id, { offset, limit })
      .then(playlists => {
        const formattedPlaylists = playlists.items.map((playlist) => DefineSpotifyPlaylist({ playlist }));
        this.playlists$.next(formattedPlaylists);
      })
      .catch(error => {
        console.error('Error fetching playlists', error);
        this.playlists$.next([]);
      });
  }

  getTopArtistsFromSpotify({ limit = 10 }): void {
    this.spotifyApi.getMyTopArtists({ limit })
      .then(topArtists => {
        const formattedArtists = topArtists.items.map((artist) => DefineSpotifyArtist({ artist }));
        this.topArtists$.next(formattedArtists);
      })
      .catch(error => {
        console.error('Error fetching top artists', error);
        this.topArtists$.next([]);
      });
  }

  getSavedMusicsFromSpotify({ offset = 0, limit = 50 }): void {
    this.spotifyApi.getMySavedTracks({ offset, limit })
      .then(savedMusics => {
        const formattedMusics = savedMusics.items.map((music) => DefineSpotifyTrack({ track: music.track }));
        this.savedMusics$.next(formattedMusics);
      })
      .catch(error => {
        console.error('Error fetching saved musics', error);
        this.savedMusics$.next([]);
      });
  }

  getUserPlaylistInfo(): Observable<IPlaylist[]> {
    return this.playlists$.asObservable();
  }

  getTopArtistsInfo(): Observable<IArtist[]> {
    return this.topArtists$.asObservable();
  }

  getsavedMusicsInfo(): Observable<IMusic[]> {
    return this.savedMusics$.asObservable();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
