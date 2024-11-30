import { Injectable } from '@angular/core';
import { Gif, RandomResponse, SearchResponse } from '../interfaces/gifs.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '2T6Kx6C1rxSWT7bUQWX8VUBqooP9jceB';
  private url: string = 'https://api.giphy.com/v1/gifs';
  
  public gifList: Gif[] = [];
  public _tagsHistory: string[] = []; 
  

  get tagsHistory(){
    return [...this._tagsHistory];
  }
  
  constructor( private http:HttpClient ) { 
    this.loadLocalStorage();
    console.log('Ready to use GifsService');
  }

  private saveLocalStorage(){
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));

  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();
    // si el tag está en el arreglo vamos a moverlo al principio
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this.tagsHistory.filter( (oldTag) => oldTag.toLowerCase() !== tag );
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  } 

  private loadLocalStorage(){
    if ( !localStorage.getItem('history') ){
      return;
    }
    this._tagsHistory = JSON.parse (localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0){return;}
    this.searchTag(this._tagsHistory[0]);

  }


  searchTag(tag: string) {
    if(tag.trim().length === 0) return;
    this.organizeHistory(tag);
    //const urlService = `${this.url}/search?api_key=${this.apiKey}&q=${tag}&limit=10`;
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

      this.http.get<SearchResponse>(`${this.url}/search`, { params })
        .subscribe( (resp) => {
          this.gifList = resp.data;
          console.log(this.gifList);//TODO: quitar
        });
  }

  getTrending$(offset: number, limit: number){
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    return this.http.get<SearchResponse>(`${this.url}/trending`, { params })
  }

  getRandomGif$(){
    const params = new HttpParams()
      .set('api_key', this.apiKey)
    return this.http.get<RandomResponse>(`${this.url}/random`, { params });
  }
}
