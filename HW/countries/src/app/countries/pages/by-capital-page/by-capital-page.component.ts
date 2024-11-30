import { Component } from "@angular/core";
import { SearchBoxComponent } from "../../../shared/components/search-box/search-box.component";
import { CountriesService } from "../../services/countries.service";
import { Country } from "../../interfaces/countries.intefaces";
import { CommonModule } from "@angular/common";
import { CountriesTableComponent } from "../../components/countries-table/countries-table.component";
import { ExportExcelComponent } from "../../components/export-excel/export-excel.component";

@Component({
    selector: "app-by-capital-page",
    standalone: true,
    imports: [CommonModule, SearchBoxComponent, CountriesTableComponent, ExportExcelComponent],
    templateUrl: "./by-capital-page.component.html",
    styleUrl: "./by-capital-page.component.scss",
})
export class ByCapitalPageComponent {
    public countries: Country[] = [];

    constructor(private countriesService: CountriesService) {}

    ngOnInit(): void {
        this.countriesService
            .searchCapital(localStorage.getItem("capital") || "")
            .subscribe((countries) => (this.countries = countries));
    }

    public searchByCapital(value: string): void {
        localStorage.setItem("capital", value);
        this.countriesService
            .searchCapital(value)
            .subscribe((countries) => (this.countries = countries));
    }
}
