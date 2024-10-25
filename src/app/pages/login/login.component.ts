import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.verifyTokenUrl();
  }

  verifyTokenUrl(): void {
    const token = this.spotifyService.getTokenFromUrlCallback();
    if (!!token) {
      this.spotifyService.defineAccessToken({ token });
    }
  }

  openLoginPage() {
    window.location.href = this.spotifyService.getLoginUrl();
  }

}