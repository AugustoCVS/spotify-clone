import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { IPlaylist } from '../../interfaces/playlist';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-left-panell',
  templateUrl: './left-panell.component.html',
  styleUrl: './left-panell.component.scss'
})
export class LeftPanellComponent implements OnInit {

  playlists: IPlaylist[] = [];

  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  selectedMenu: string = 'Home';

  constructor(private spofityService: SpotifyService) { }

  ngOnInit(): void {
    this.getPlaylists();
  }

  buttonClick(description: string) {
    this.selectedMenu = description;
  }

  async getPlaylists() {
    this.playlists = await this.spofityService.getUserPlaylist({ limit: 10 });
    console.log(this.playlists);
  }

}
