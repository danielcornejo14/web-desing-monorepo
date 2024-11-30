import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../interfaces/countries.intefaces';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  public searchCapital( term: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;

    return this.http.get<Country[]>(url).pipe(
      catchError( err => of([]) )
    ); 
  }


  public searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null ),
      catchError( err => of(null) )
    ); 
  }


  public searchCountriesByName( term: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;

    return this.http.get<Country[]>(url).pipe(
      catchError( err => of([]) )
    ); 
  }

  public searchCountryByRegion( region: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;

    return this.http.get<Country[]>(url).pipe(
      catchError( err => of([]) )
    ); 
  }


}
