import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { IPlaylist } from '../../interfaces/playlist';
import { SpotifyService } from '../../services/spotify.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-left-panell',
  templateUrl: './left-panell.component.html',
  styleUrl: './left-panell.component.scss'
})
export class LeftPanellComponent implements OnInit {

  protected playlists$: Observable<IPlaylist[]> = new Observable<IPlaylist[]>();

  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  selectedMenu: string = 'Home';

  constructor(private spofityService: SpotifyService) { }

  ngOnInit(): void {
    this.spofityService.getUserPlaylistFromSpotify({ offset: 0, limit: 10 });
    this.getPlaylists();
  }

  buttonClick(description: string): void {
    this.selectedMenu = description;
  }

  getPlaylists(): void {
    this.playlists$ = this.spofityService.getUserPlaylistInfo();
  }

}
