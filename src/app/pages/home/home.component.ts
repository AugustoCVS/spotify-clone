import { Component, OnInit } from '@angular/core';
import { IMusic } from '../../interfaces/music';
import { SpotifyService } from '../../services/spotify.service';
import { Observable } from 'rxjs';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  playIcon = faPlay;

  protected musics$: Observable<IMusic[]> = new Observable<IMusic[]>();

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.spotifyService.getSavedMusicsFromSpotify({});
    this.musics$ = this.spotifyService.getsavedMusicsInfo();
  }

  getArtists({ music }: { music: IMusic }): string {
    return music.artists.map(artist => artist.name).join(', ');
  }

  async handleExecuteMusic({ music }: { music: IMusic }): Promise<void> {
    await this.spotifyService.handleExecuteMusic({ musicId: music.id });
  }
}
