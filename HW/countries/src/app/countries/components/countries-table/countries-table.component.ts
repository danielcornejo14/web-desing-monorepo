import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/countries.intefaces';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-countries-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './countries-table.component.html',
  styleUrl: './countries-table.component.scss'
})
export class CountriesTableComponent {
  @Input()
  public countries: Country[] = [];
}
