import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [RouterModule, CommonModule, NgFor],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css',
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  search(term: string) {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}
