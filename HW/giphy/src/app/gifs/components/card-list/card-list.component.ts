import { Component, input, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../card/card.component";
import { GifTileComponent } from "../gif-tile/gif-tile.component";

type gifListType = 'card' | 'tile';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent, GifTileComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  @Input({required: true})
  public gifs: Gif[] = [];

  @Input({required: true})
  public gifListType!: gifListType;

  @Input({required: true})
  public direction: 'row' | 'column' = 'row';

}
