import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: `./countryTable.component.html`,
})
export class CountryTableComponent {
  @Input()
  countries:Country[] = []
}
