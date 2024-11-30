import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private _gifsService: GifsService) { }

  searchTag(): void{
    const newTag = this.tagInput.nativeElement.value;
    this._gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value= '';
  }





}
