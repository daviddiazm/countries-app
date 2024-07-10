import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Params, Route, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ) {}

  // ngOnInit(): void {
  //   this.activatedRoute.params
  //     .subscribe(({id}) => {
  //       console.log(id);
  //       this.countriesService.searchCountryByAplhaCode(id)
  //         .subscribe(country => console.log(country))
  //     })
  //     // .subscribe((params: Params) => {
  //     //   console.log(params['id']);
  //     // })
  // }

  public country ?: Country

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.countriesService.searchCountryByAplhaCode(id) )
      )
      .subscribe((country) => {
        if(!country) {
          this.router.navigateByUrl("/countries/by-region");
        } else {
          this.country = country;
        }
      })
  }




}
