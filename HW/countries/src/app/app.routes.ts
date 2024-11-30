import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutComponent } from './shared/pages/about/about.component';
import { ContactsComponent } from './shared/pages/contacts/contacts.component';
import { count } from 'rxjs';
import { ByCapitalPageComponent } from './countries/pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './countries/pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './countries/pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './countries/pages/country-page/country-page.component';

// export const routes: Routes = [
//     {
//         path: '',
//         component: HomePageComponent
//     },
//     {
//         path: 'about',
//         component: AboutComponent
//     },
//     {
//         path: 'contact',
//         component: ContactsComponent
//     },
//     {
//         path: '**',
//         redirectTo: ''
//     }
// ];

export const routes: Routes  = [
    {
      path: 'about',
      component: AboutComponent
    },
    {
      path: 'contact',
      component: ContactsComponent
    },
    {
      path: 'countries',
      children: 
      [
        {
          path: 'by-capital',
          component: ByCapitalPageComponent,
        },
        {
          path: 'by-country',
          component: ByCountryPageComponent,
        },
        {
          path: 'by-region',
          component: ByRegionPageComponent,
        },
        {
          path: 'by/:id',
          component: CountryPageComponent,
        },
        {
          path: '**',
          redirectTo: 'by-capital'
        }

      ]
      
    },
    {
      path: '**',
      redirectTo: 'countries'
    }
  ];

