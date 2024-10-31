import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Observable } from 'rxjs';
import { IArtist } from '../../interfaces/artists';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss'
})
export class TopComponent implements OnInit {

  protected topArtists$: Observable<IArtist[]> = new Observable<IArtist[]>();

  constructor(private spotityService: SpotifyService) { }

  ngOnInit(): void {
    this.topArtists$ = this.spotityService.getTopArtistsInfo();
  }

}
