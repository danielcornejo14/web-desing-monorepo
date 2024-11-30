import { Component, inject } from '@angular/core';
import { SearchBoxComponent } from "../../../shared/components/search-box/search-box.component";
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries.intefaces';
import { CountriesTableComponent } from "../../components/countries-table/countries-table.component";
import { ExportExcelComponent } from "../../components/export-excel/export-excel.component";

@Component({
  selector: 'app-by-region-page',
  standalone: true,
  imports: [SearchBoxComponent, CountriesTableComponent, ExportExcelComponent],
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.scss'
})
export class ByRegionPageComponent {

  countriesService: CountriesService = inject(CountriesService);
  countries: Country[] = [];

  ngOnInit() {
    this.countriesService.searchCountryByRegion( localStorage.getItem('region') || '' )
      .subscribe( countries => this.countries = countries );
  }

  searchByRegion( term: string ) {
    localStorage.setItem('region', term);
    this.countriesService.searchCountryByRegion( term ).subscribe( countries => this.countries = countries );
  }
}
