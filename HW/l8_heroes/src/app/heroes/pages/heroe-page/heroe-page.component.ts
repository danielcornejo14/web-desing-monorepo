import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { CommonModule } from '@angular/common';
import { HeroImagePipe } from '../../pipes/hero-image.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-heroe-page',
  standalone: true,
  imports: [CommonModule, HeroImagePipe, MatCardModule, MatDialogModule, MatButtonModule],
  templateUrl: './heroe-page.component.html',
  styleUrl: './heroe-page.component.scss'
})
export class HeroePageComponent implements OnInit {


  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  heroesService: HeroesService = inject(HeroesService);
  dialog: MatDialog = inject(MatDialog);

  hero: Hero | undefined;

  constructor() { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id })=> this.heroesService.getHeroById(id))
      ).subscribe( hero => {
        
        this.hero = hero;
      
      })
     
  }

  goBack() {
    this.dialog.open(DialogComponent, {}).afterClosed().subscribe((value: boolean) => {
      if (value) {
        this.router.navigate(['/heroes/list']);
      }
    });
  }



}
