import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css'],
  providers: [HeroService]
})
export class DashboardComponent implements OnInit {
  public heroes: Hero[];

  constructor(private _heroService: HeroService, private _router: Router) { }

  getTopHeroes() {
      this.heroes = this._heroService.getTopHeroes(2);
  }

  ngOnInit() {
    this.getTopHeroes();
  }

  gotoDetail(hero: Hero) {
    this._router.navigate(['HeroDetail', { id: hero.id }]);
  }
}
