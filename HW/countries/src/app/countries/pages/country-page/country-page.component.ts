import { Component } from "@angular/core";
import { Country } from "../../interfaces/countries.intefaces";
import { ActivatedRoute, Router } from "@angular/router";
import { CountriesService } from "../../services/countries.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-country-page",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./country-page.component.html",
    styleUrl: "./country-page.component.scss",
})
export class CountryPageComponent {
    public country?: Country;

    constructor(
        private activeRoute: ActivatedRoute,
        private route: Router,
        private countriesService: CountriesService
    ) {}

    ngOnInit(): void {
        this.activeRoute.params.subscribe(({ id }) => {
            this.countriesService
                .searchCountryByAlphaCode(id)
                .subscribe((country) => {
                    if (!country) {
                        this.route.navigate(["/"]);
                        return;
                    }
                    this.country = country;
                });
        });
    }

    navigateBack() {
      const lastRoute = localStorage.getItem('last-route');
      console.log(lastRoute);
      this.route.navigate(["countries", lastRoute]);
    }
}
