import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: string = "https://restcountries.com/v3.1"
  constructor(private http: HttpClient) { }


  searchCountryByAplhaCode (code: string ): Observable<Country | null > {
    console.log("el code desde service ",code);

    const url:string = `${this.apiUrl}/alpha/${code}`
    return this.http.get<Country[]>(url)
      .pipe(
        tap(countries => console.log(countries[0])),
        map( countries => countries.length > 0 ? countries[0] : null ),
        tap(country => console.log(country)),
        catchError(() => of(null))
      )
  }

  searchCapital(term: string):Observable<Country[]> {
    const url:string = `${this.apiUrl}/capital/${term}`
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( error => {
          console.log(error);
          return of([])
        } )
        // tap(countries => console.log("tap 1", countries)) ,
        // map( countries => countries = []),
        // tap(countries => console.log("tap 2", countries)) ,
      )
  }

  searchCountry (term : string) : Observable<Country[]> {
    const url:string = `${this.apiUrl}/name/${term}`
    return this.http.get<Country[]>(url)
      .pipe(
        // tap(countries => console.log(countries)),
        catchError(()=>of([]))
      )
  }

  searchRegion (term : string) : Observable<Country[]> {
    const url:string = `${this.apiUrl}/region/${term}`
    return this.http.get<Country[]>(url)
      .pipe(
        // tap(countries => console.log(countries)),
        // catchError(()=>of([]))
        catchError( error => {
          console.log(error);
          return of([])
        } )
      )
  }
}
