import { Component, OnInit } from '@angular/core';
import { IMusic } from '../../interfaces/music';
import { Observable } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss'
})
export class PlayerCardComponent implements OnInit {

  playIcon = faPlay;
  backwardIcon = faStepBackward;
  forwardIcon = faStepForward

  protected currentMusic$: Observable<IMusic> = new Observable<IMusic>();

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.currentMusic$ = this.spotifyService.getCurrentMusicInfo();
  }

  skipToNextMusic(): void {
    this.playerService.nextMusic();
  }

  skipToPreviousMusic(): void {
    this.playerService.previousMusic();
  }

}
