import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMusic } from '../../interfaces/music';
import { SpotifyService } from '../../services/spotify.service';
import { Observable, Subscription } from 'rxjs';
import { faPlay } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  playIcon = faPlay;

  protected musics$: Observable<IMusic[]> = new Observable<IMusic[]>();
  protected currentMusic: IMusic = {} as IMusic;

  subs: Subscription[] = [];

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.spotifyService.getSavedMusicsFromSpotify({});
    this.spotifyService.getCurrentMusicFromSpotify();
    this.musics$ = this.spotifyService.getsavedMusicsInfo();
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getArtists({ music }: { music: IMusic }): string {
    return music.artists.map(artist => artist.name).join(', ');
  }

  getCurrentMusic(): void {
    const sub = this.spotifyService.getCurrentMusicInfo()
      .subscribe((music: IMusic) => {
        this.currentMusic = music;
      })

    this.subs.push(sub)
  }

  async handleExecuteMusic({ music }: { music: IMusic }): Promise<void> {
    await this.spotifyService.handleExecuteMusic({ musicId: music.id });
    this.spotifyService.publishCurrentMusic({ music });
  }
}
