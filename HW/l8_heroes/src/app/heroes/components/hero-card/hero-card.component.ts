import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider'; 
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroImagePipe } from "../../pipes/hero-image.pipe";

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    HeroImagePipe
],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {

  @Input()
  public hero!: Hero;

  ngOnInit(): void {
    if (!this.hero) {
      throw new Error('The hero is required');
    }
  }

}
