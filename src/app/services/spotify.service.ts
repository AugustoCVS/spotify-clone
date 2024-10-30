import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Spotify from 'spotify-web-api-js'
import { IUser } from '../interfaces/user';
import { DefineSpotifyArtist, DefineSpotifyPlaylist, DefineSpotifyUser } from '../common/helpers/spotify.helper';
import { IPlaylist } from '../interfaces/playlist';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IArtist } from '../interfaces/artists';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  user!: IUser;
  private spotifyApi!: Spotify.SpotifyWebApiJs;
  private playlists$: BehaviorSubject<IPlaylist[]> = new BehaviorSubject<IPlaylist[]>([]);
  private topArtists$: BehaviorSubject<IArtist[]> = new BehaviorSubject<IArtist[]>([]);

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

  async getUserPlaylistFromSpotify({ offset = 0, limit = 50 }): Promise<void> {
    await this.spotifyApi.getUserPlaylists(this.user.id, { offset, limit })
      .then(playlists => {
        const formattedPlaylists = playlists.items.map((playlist) => DefineSpotifyPlaylist({ playlist }));
        this.playlists$.next(formattedPlaylists);
      })
      .catch(error => {
        console.error('Error fetching playlists', error);
        this.playlists$.next([]);
      });
  }

  async getTopArtistsFromSpotify({ limit = 10 }) {
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

  getUserPlaylistInfo(): Observable<IPlaylist[]> {
    return this.playlists$.asObservable();
  }

  getTopArtistsInfo(): Observable<IArtist[]> {
    return this.topArtists$.asObservable();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
