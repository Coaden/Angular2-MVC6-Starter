import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {NgForm}    from 'angular2/common';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {Logger} from './logger.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css'],
  inputs: ['hero']
  
})
export class HeroDetailComponent implements OnInit {
  public hero: Hero;
  private additionalPowers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  constructor(private _heroService: HeroService, private _logger: Logger,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    if (!this.hero) {
      let id = +this._routeParams.get('id');
      if(id === 0) {
        this.hero = new Hero(0, '', '', '', '');
      } else {
          this._heroService.getHero(id)
          .subscribe(hero => {
              this.hero = hero;
              this._logger.log("We got hero #" + hero.id);
        });         
      }
    }
  }
  
  showError(name) {
      return !name.valid && name.dirty;
  }
  
  deleteHero() {
      this._heroService.deleteHero(this.hero.id)
      window.history.back();
  }

  goBack() {
    window.history.back();
  }
  
  submitted = false;
  onSubmit() { 
    this.submitted = true;
    this._heroService.saveHero(this.hero); 
    window.history.back();
  }

}
