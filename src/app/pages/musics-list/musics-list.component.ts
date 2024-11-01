import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMusic } from '../../interfaces/music';
import { SpotifyService } from '../../services/spotify.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { IPlaylist } from '../../interfaces/playlist';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-musics-list',
  templateUrl: './musics-list.component.html',
  styleUrl: './musics-list.component.scss'
})
export class MusicsListComponent implements OnInit, OnDestroy {

  playIcon = faPlay;

  protected bannerText: string = '';
  protected bannerImgUrl: string = '';
  protected musics: IMusic[] | undefined = [];
  protected currentMusic: IMusic = {} as IMusic;
  protected title: string = '';

  subs: Subscription[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private activedRoute: ActivatedRoute,
    private playerService: PlayerService,
  ) {
    this.playerService.getCurrentMusic();
  }

  ngOnInit(): void {
    this.getMusics();
    this.defineCurrentMusic();
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
    const sub = this.spotifyService.getPlaylistMusicsInfo()
      .subscribe((playlist) => {
        this.definePageData({ playlist });
      })

    this.subs.push(sub);
  }

  getArtistData({ artistId }: { artistId: string }): void {

  }

  definePageData({ playlist }: { playlist: IPlaylist }): void {
    this.bannerText = playlist.name;
    this.bannerImgUrl = playlist.imageUrl;
    this.musics = playlist.musics;
    this.title = 'Músicas: ' + playlist.name;
  }

  defineCurrentMusic(): void {
    const sub = this.spotifyService.getCurrentMusicInfo().subscribe((music) => {
      this.currentMusic = music;
    })

    this.subs.push(sub);
  }

  async handleExecuteMusic({ music }: { music: IMusic }): Promise<void> {
    await this.spotifyService.handleExecuteMusic({ musicId: music.id });
    this.spotifyService.publishCurrentMusic({ music });
  }

}
