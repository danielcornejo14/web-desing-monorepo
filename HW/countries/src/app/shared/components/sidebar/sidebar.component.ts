import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  ngOnInit() {
    if( !localStorage.getItem('last-route') ) {
      localStorage.setItem('last-route', 'by-capital');
    }
  }
  saveRoute( route: string ) {
    localStorage.setItem('last-route', route);
  }
}
