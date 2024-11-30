import { Injectable } from '@angular/core';
import { environments } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseUrl = environments.baseUrl;

  constructor(private http: HttpClient) { }


  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero| undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      catchError(error => of(undefined))
    );
  }

  updateHero(hero : Hero): Observable<Hero>{
    if (!hero.id) {
      throw Error('El id del heroe es necesario');
    }
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);    
  }

  deleteHeroById(id: string): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      map (resp => true),
      catchError(error => of(false))
    )}


}
