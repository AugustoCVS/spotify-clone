import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrl: './user-footer.component.scss'
})
export class UserFooterComponent implements OnInit {
  logOutIcon = faSignOutAlt;
  userInfo: IUser = {} as IUser;

  constructor(private spofityService: SpotifyService) { }

  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo(): void {
    this.userInfo = this.spofityService.user
  }

}
