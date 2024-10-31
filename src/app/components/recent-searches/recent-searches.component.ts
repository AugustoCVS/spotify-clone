import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrl: './recent-searches.component.scss'
})
export class RecentSearchesComponent {

  recentSearchs: string[] = []

  searchField: string = '';

  defineSearchField({ value }: { value: string }): void {
    this.searchField = value;
  }

  handleSearch(): void {
    this.recentSearchs.push(this.searchField);
    this.searchField = '';
  }

}
