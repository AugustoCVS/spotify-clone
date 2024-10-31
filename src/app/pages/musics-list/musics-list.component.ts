import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, take } from 'rxjs';
import { IMusic } from '../../interfaces/music';
import { SpotifyService } from '../../services/spotify.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { IPlaylist } from '../../interfaces/playlist';
import { newPlaylist } from '../../common/spotify.factories';

@Component({
  selector: 'app-musics-list',
  templateUrl: './musics-list.component.html',
  styleUrl: './musics-list.component.scss'
})
export class MusicsListComponent implements OnInit, OnDestroy {

  playIcon = faPlay;
  bannerImgUrl: string = '';

  protected playlist$: Observable<IPlaylist> = new Observable<IPlaylist>();
  protected currentMusic: IMusic = {} as IMusic;

  subs: Subscription[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMusics();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getMusics(): void {
    const sub = this.activedRoute.paramMap
      .subscribe(async params => {
        const id = params.get('id') || '';
        const type = params.get('tipo') || '';
        this.getRouteParams({ type, id });
      })

    this.subs.push(sub);
  }

  getArtists({ music }: { music: IMusic }): string {
    return music.artists.map(artist => artist.name).join(', ');
  }

  getRouteParams({ type, id }: { type: string; id: string }): void {
    if (type === 'playlist') {
      this.getPlaylistData({ playlistId: id });
    } else {
      this.getArtistData({ artistId: id });
    }
  }

  getPlaylistData({ playlistId }: { playlistId: string }): void {
    this.spotifyService.getMusicsFromSpotifyPlaylist({ playlistId });
    this.playlist$ = this.spotifyService.getPlaylistMusicsInfo();
  }

  getArtistData({ artistId }: { artistId: string }): void {

  }

  async handleExecuteMusic({ music }: { music: IMusic }): Promise<void> {
    await this.spotifyService.handleExecuteMusic({ musicId: music.id });
    this.spotifyService.publishCurrentMusic({ music });
  }

}
