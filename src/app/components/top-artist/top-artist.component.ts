import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { map, Observable } from 'rxjs';
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
    this.getTopArtists();
  }

  getTopArtists() {
    this.topArtists$ = this.spotifyService.getTopArtistsInfo().pipe(
      map((artists: IArtist[]) => artists.slice(0, 1))
    );
  }

}
