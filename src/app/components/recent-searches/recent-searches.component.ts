import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrl: './recent-searches.component.scss'
})
export class RecentSearchesComponent {

  recentSearchs: string[] = [
    'Top Brasil', 'Top Global', 'Esquente Sertaneja', 'Funk Hits', 'Pagodeira'
  ]

}
