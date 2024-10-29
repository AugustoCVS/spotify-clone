import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Spotify from 'spotify-web-api-js'
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi!: Spotify.SpotifyWebApiJs;
  user!: IUser;

  constructor() {
    this.spotifyApi = new Spotify();
  }

  async initializeUser(): Promise<boolean> {
    const token = this.getTokenFromStorage();

    if (!!this.user) return true;
    if (!token) return false;

    try {
      this.defineAccessToken({ token });
      await this.getSpotifyUserData();
      return true
    } catch (error) {
      return false;
    }

  }

  async getSpotifyUserData() {
    const userInfo = await this.spotifyApi.getMe();
    console.log(userInfo)
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

}
