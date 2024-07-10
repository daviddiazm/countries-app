import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  constructor(private countriesService: CountriesService) { }

  countries: Country[] = []
  isLoading: boolean = false
  selectedRegion?: Region

  countriesRegions: Region[] = ["Americas", "Asia", "Africa", "Europe", "Oceania"]

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region
  }

  searchRegion(term: Region) {
    this.isLoading = true
    this.selectedRegion = term
    this.countriesService.searchRegion(term)
      .subscribe(
        countries => {
          this.countries = countries
          this.isLoading = false
        })
  }
}
