import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  constructor(private countriesService: CountriesService) {}


  public countries: Country[] = []
  public isLoadng: boolean = false
  public initialValue: string = ''


  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries
    this.initialValue = this.countriesService.cacheStore.byCountries.term
  }

  searchByCountry (term: string) {
    this.isLoadng = true
    this.countriesService.searchCountry(term)
      .subscribe(
        countries => {
          this.countries  = countries
          this.isLoadng = false
        }
      )
  }
}
