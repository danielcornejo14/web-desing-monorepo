import { Component } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { HeroCardComponent } from "../../components/hero-card/hero-card.component";

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [HeroCardComponent],
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent {
  public heroes: Hero[] = [];

  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {
    this.heroeService.getHeroes().subscribe(
      heroes => this.heroes = heroes);    
  }

}
