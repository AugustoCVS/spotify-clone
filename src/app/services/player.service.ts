import { take } from "rxjs";
import { Injectable } from "@angular/core";
import { SpotifyService } from "./spotify.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  timerId: any = null

  constructor(private spotifyService: SpotifyService) { }

  getCurrentMusic(): void {
    clearTimeout(this.timerId);

    this.spotifyService.getCurrentMusicFromSpotify();
    this.spotifyService.getCurrentMusicInfo()
      .pipe(take(1))
      .subscribe(music => {
        this.spotifyService.publishCurrentMusic({ music });
      });

    this.timerId = setInterval(() => {
      this.getCurrentMusic();
    }, 3000)

  }

}