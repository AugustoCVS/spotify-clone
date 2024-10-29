import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';

@Component({
  selector: 'app-left-panell',
  templateUrl: './left-panell.component.html',
  styleUrl: './left-panell.component.scss'
})
export class LeftPanellComponent {

  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlist = faMusic;

  selectedMenu: string = 'Home';

  buttonClick(description: string) {
    this.selectedMenu = description;
  }

}
