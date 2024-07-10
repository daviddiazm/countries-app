import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: string = "https://restcountries.com/v3.1"
  constructor(private http: HttpClient) {
    this.loadToLocalStorage()
  }

  public cacheStore:CacheStore = {
    byCapital:   { term: "", countries: [] },
    byCountries: { term: "", countries: [] },
    byRegion:    { region: '', countries: [] }
  }


  private saveToLocalStorage():void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore) )
  }

  private loadToLocalStorage():void {
    if(!localStorage.getItem('cacheStore')) {
      return
    } else {
      this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
    }
  }

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

  // searchCapital(term: string):Observable<Country[]> {
  //   const url:string = `${this.apiUrl}/capital/${term}`
  //   return this.http.get<Country[]>(url)
  //     .pipe(
  //       catchError( error => {
  //         console.log(error);
  //         return of([])
  //       } )
  //       // tap(countries => console.log("tap 1", countries)) ,
  //       // map( countries => countries = []),
  //       // tap(countries => console.log("tap 2", countries)) ,
  //     )
  // }

  // searchCountry (term : string) : Observable<Country[]> {
  //   const url:string = `${this.apiUrl}/name/${term}`
  //   return this.http.get<Country[]>(url)
  //     .pipe(
  //       // tap(countries => console.log(countries)),
  //       catchError(()=>of([]))
  //     )
  // }

  // searchRegion (term : string) : Observable<Country[]> {
  //   const url:string = `${this.apiUrl}/region/${term}`
  //   return this.http.get<Country[]>(url)
  //     .pipe(
  //       // tap(countries => console.log(countries)),
  //       // catchError(()=>of([]))
  //       catchError( error => {
  //         console.log(error);
  //         return of([])
  //       } )
  //     )
  // }


  // Refactorizaciones

  private getCountriesReques( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
        delay( 2000 )
      )
  }

  public searchCapital(term:string):Observable<Country[]> {
    const url:string = `${this.apiUrl}/capital/${term}`
    return this.getCountriesReques(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = {term, countries} ),
        tap(() => {this.saveToLocalStorage()}),
      )
  }

  public searchCountry(term: string):Observable<Country[]> {
    const url:string = `${this.apiUrl}/name/${term}`
    return this.getCountriesReques(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries = {countries, term}),
        tap(() => {this.saveToLocalStorage()}),
      )
  }

  public searchRegion(region : Region):Observable<Country[]> {
    const url:string = `${this.apiUrl}/region/${region}`
    return this.getCountriesReques(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {countries, region}),
        tap(() => {this.saveToLocalStorage()}),
      )
  }
}
