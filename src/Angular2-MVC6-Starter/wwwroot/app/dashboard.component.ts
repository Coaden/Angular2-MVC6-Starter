import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {Hero} from './hero';
import {Logger} from './logger.service';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private _heroService: HeroService, private _router: Router, 
              private _logger: Logger) { }

  ngOnInit() {
      this._heroService.getHeroes()
        .subscribe(heroes => {
            var maxHeroes = heroes.length < 4 ? heroes.length : 4;
            this.heroes = heroes.slice(0, maxHeroes);
            this._logger.log("We got " + this.heroes.length + " heros");
        });
  }

  gotoDetail(hero: Hero) {
    this._router.navigate(['HeroDetail', { id: hero.id }]);
  }
}
