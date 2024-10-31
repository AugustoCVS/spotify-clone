import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { IMusic } from "../interfaces/music";
import { newMusic } from "../common/spotify.factories";
import { SpotifyService } from "./spotify.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private spotifyService: SpotifyService) {
  }


}