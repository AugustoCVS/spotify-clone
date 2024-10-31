import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.scss'
})
export class ArtistCardComponent {
  @Input()
  imgSrc: string = '';
  @Input()
  name: string = '';

  @Output()
  click = new EventEmitter<void>();

  onClick(): void {
    this.click.emit();
  }

}
