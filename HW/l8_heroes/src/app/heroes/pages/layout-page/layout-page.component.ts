import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [
            CommonModule,
            RouterModule,
            MatSidenavModule,
            MatToolbarModule,
            MatListModule,
            MatButtonModule,
            MatIconModule
          ],
  templateUrl: './layout-page.component.html',
  styles: `
    .spacer {
      flex: 1 1 auto;
    }
  `
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]

}
