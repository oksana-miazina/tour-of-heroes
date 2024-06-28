import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RouterModule, HeroDetailComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent {
  heroes?: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes?.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes?.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
