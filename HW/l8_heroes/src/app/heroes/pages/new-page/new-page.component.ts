import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HeroImagePipe } from '../../pipes/hero-image.pipe';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    HeroImagePipe,
    MatDividerModule
  ],
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent {
  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  public heroForm = new FormGroup({
    id:        new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true}),
    publisher: new FormControl<Publisher>( Publisher.MarvelComics ),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img:    new FormControl(''),
  });

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  get currentHero(): Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    //? caso cuando está creando uno nuevo
    if( !this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id })=> this.heroesService.getHeroById(id))
      ).subscribe( hero => {
        if (! hero){
            return this.router.navigateByUrl('/');
        }
        //sí hay heroe
        this.heroForm.reset(hero);
        return;
      })
     
  }

  onSubmit() {
    if(this.heroForm.invalid) return;

    if (this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
        .subscribe( hero => {
          this.router.navigate(['/heroes/edit', hero.id]);
          this.snackbar.open(`Héroe ${hero.superhero} actualizado!`, 'Cerrar');
        });
    }
  }

  onDeleteHero() {
    if (!this.currentHero.id) return;

    const dialogRef =  this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .subscribe( (result) => {
        if (!result) return;

        this.heroesService.deleteHeroById(this.currentHero.id!)
          .subscribe( wasDeleted => {
            if (wasDeleted){
              this.router.navigate(['/heroes']);
              this.snackbar.open(`Héroe ${this.currentHero.superhero} eliminado!`, 'Cerrar');    
            }

          });

      });

  }

}
