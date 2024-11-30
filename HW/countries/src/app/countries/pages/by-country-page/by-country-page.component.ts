import { Component, computed, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchBoxComponent } from "../../../shared/components/search-box/search-box.component";
import { CountriesService } from '../../services/countries.service';
import { CountriesTableComponent } from "../../components/countries-table/countries-table.component";
import { Country } from '../../interfaces/countries.intefaces';
import { ExportExcelComponent } from "../../components/export-excel/export-excel.component";

@Component({
  selector: 'app-by-country-page',
  standalone: true,
  imports: [SearchBoxComponent, CountriesTableComponent, ExportExcelComponent],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.scss'
})
export class ByCountryPageComponent {

  countriesService: CountriesService = inject(CountriesService);
  countries: Country[] = [];

  ngOnInit() {
    this.countriesService.searchCountriesByName( localStorage.getItem('name') || '' )
      .subscribe( countries => this.countries = countries );
  }

  searchByName( term: string ) {
    localStorage.setItem('name', term);
    this.countriesService.searchCountriesByName( term ).subscribe( countries => this.countries = countries );
  }
}
