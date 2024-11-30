import { Component, input } from '@angular/core';

@Component({
  selector: 'app-gif-tile',
  standalone: true,
  imports: [],
  templateUrl: './gif-tile.component.html',
  styleUrl: './gif-tile.component.scss'
})
export class GifTileComponent {

  url = input.required()
  title = input.required()

}
