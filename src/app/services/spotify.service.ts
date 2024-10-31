import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Spotify from 'spotify-web-api-js'
import { IUser } from '../interfaces/user';
import { DefineSpotifyArtist, DefineSpotifyPlaylist, DefineSpotifyTrack, DefineSpotifyUser } from '../common/helpers/spotify.helper';
import { IPlaylist } from '../interfaces/playlist';
import { BehaviorSubject, from, Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { IArtist } from '../interfaces/artists';
import { IMusic } from '../interfaces/music';
import { newMusic } from '../common/spotify.factories';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  user!: IUser;
  private spotifyApi!: Spotify.SpotifyWebApiJs;
  private playlists$: BehaviorSubject<IPlaylist[]> = new BehaviorSubject<IPlaylist[]>([]);
  private topArtists$: BehaviorSubject<IArtist[]> = new BehaviorSubject<IArtist[]>([]);
  private savedMusics$: BehaviorSubject<IMusic[]> = new BehaviorSubject<IMusic[]>([]);
  private currentMusic$: BehaviorSubject<IMusic> = new BehaviorSubject<IMusic>(newMusic());

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

  private async getSpotifyUserData() {
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

  private getTokenFromStorage(): string {
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
    from(this.spotifyApi.getUserPlaylists(this.user.id, { offset, limit }))
      .pipe(take(1))
      .subscribe((playlists) => {
        const formattedPlaylists = playlists.items.map((playlist) => DefineSpotifyPlaylist({ playlist }));
        this.playlists$.next(formattedPlaylists);
      });
  }

  getTopArtistsFromSpotify({ limit = 10 }): void {
    from(this.spotifyApi.getMyTopArtists({ limit }))
      .pipe(take(1))
      .subscribe((topArtists) => {
        const formattedArtists = topArtists.items.map((artist) => DefineSpotifyArtist({ artist }));
        this.topArtists$.next(formattedArtists);
      });
  }

  getSavedMusicsFromSpotify({ offset = 0, limit = 50 }): void {
    from(this.spotifyApi.getMySavedTracks({ offset, limit }))
      .pipe(take(1))
      .subscribe((musics) => {
        const formattedMusics = musics.items.map((music) => DefineSpotifyTrack({ track: music.track }));
        this.savedMusics$.next(formattedMusics);
      });
  }

  getCurrentMusicFromSpotify(): void {
    from(this.spotifyApi.getMyCurrentPlayingTrack())
      .pipe(take(1))
      .subscribe((music) => {
        this.publishCurrentMusic({ music: DefineSpotifyTrack({ track: music.item }) });
      });
  }

  publishCurrentMusic({ music }: { music: IMusic }): void {
    this.currentMusic$.next(music);
  }

  getCurrentMusicInfo(): Observable<IMusic> {
    return this.currentMusic$.asObservable();
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

  async handleExecuteMusic({ musicId }: { musicId: string }): Promise<void> {
    await this.spotifyApi.queue(musicId);
    await this.skipToNextMusic();
  }

  async skipToNextMusic(): Promise<void> {
    await this.spotifyApi.skipToNext();
  }

  async skipToPreviousMusic(): Promise<void> {
    await this.spotifyApi.skipToPrevious();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
