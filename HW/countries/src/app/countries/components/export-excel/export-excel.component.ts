import { Component, input, InputSignal } from '@angular/core';
import { Country } from '../../interfaces/countries.intefaces';
import {utils, writeFile} from 'xlsx';
@Component({
  selector: 'app-export-excel',
  standalone: true,
  imports: [],
  templateUrl: './export-excel.component.html',
  styleUrl: './export-excel.component.scss'
})
export class ExportExcelComponent {


  exportToExcel(): void {

    const newBook = utils.book_new();
    const table = document.getElementById('countries-table');
    
    console.log(table);
    
    const newSheet = utils.table_to_sheet(table);
    

    utils.book_append_sheet(newBook, newSheet, 'Countries');
    writeFile(newBook, 'countries.xlsx');

  }

}
