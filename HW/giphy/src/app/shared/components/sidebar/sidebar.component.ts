import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private _gifService: GifsService) { }
    
  get tags(): string[] {
    return this._gifService._tagsHistory;
  }

  public searchTag(tag: string): void {
    this._gifService.searchTag(tag);
  }


}
