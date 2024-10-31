import { Observable, take } from "rxjs";
import { Injectable } from "@angular/core";
import { IMusic } from "../interfaces/music";
import { SpotifyService } from "./spotify.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentMusic$: Observable<IMusic> = new Observable<IMusic>();
  timerId: any = null

  constructor(private spotifyService: SpotifyService) {
    this.getCurrentMusic();
  }

  getCurrentMusic(): void {
    clearTimeout(this.timerId);

    this.spotifyService.getCurrentMusicFromSpotify();
    this.currentMusic$ = this.spotifyService.getCurrentMusicInfo();

    this.currentMusic$
      .pipe(take(1))
      .subscribe(music => {
        this.spotifyService.publishCurrentMusic({ music });
      });

    this.timerId = setInterval(() => {
      this.getCurrentMusic();
    }, 3000)

  }

}