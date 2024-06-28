import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import {HEROES} from '../mock-heroes';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, HeroDetailComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes = HEROES;
  selectedHero?: Hero;

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
}
