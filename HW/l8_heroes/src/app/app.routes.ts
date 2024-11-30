import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { HeroePageComponent } from './heroes/pages/heroe-page/heroe-page.component';
import { ListPageComponent } from './heroes/pages/list-page/list-page.component';
import { NewPageComponent } from './heroes/pages/new-page/new-page.component';
import { SearchPageComponent } from './heroes/pages/search-page/search-page.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LayoutPageComponent } from './heroes/pages/layout-page/layout-page.component';


export const routes: Routes = [
    {
        path: 'auth',
        children: [
            { path: 'login', component: LoginPageComponent },
            { path: 'new-account', component: RegisterPageComponent },
            { path: '**', redirectTo: 'login' },
          ]
    },
    {
        path: 'heroes',
        component: LayoutPageComponent,
        children: [
        { path: 'new-hero', component: NewPageComponent },
        { path: 'search', component: SearchPageComponent },
        { path: 'edit/:id', component: NewPageComponent },
        { path: 'list', component: ListPageComponent },
        { path: ':id', component: HeroePageComponent },
        { path: '**', redirectTo: 'list' },
        ]
    },
    {
        path: '404',
        component: Error404PageComponent,
      },
      {
        path: '',
        redirectTo: 'heroes',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '404',
      }
];
