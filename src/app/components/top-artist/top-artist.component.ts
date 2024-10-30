import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Observable } from 'rxjs';
import { IArtist } from '../../interfaces/artists';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrl: './top-artist.component.scss'
})
export class TopArtistComponent implements OnInit {

  protected topArtists$: Observable<IArtist[]> = new Observable<IArtist[]>();

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.getTopArtistsFromSpotify({ limit: 1 });
    this.getTopArtists();
  }

  getTopArtists() {
    this.topArtists$ = this.spotifyService.getTopArtistsInfo();
  }

}
