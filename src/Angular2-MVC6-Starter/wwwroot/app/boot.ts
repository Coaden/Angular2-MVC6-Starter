import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HeroService} from './hero.service';
import {AppComponent} from './app.component';
import {Logger} from './logger.service';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
    HeroService,
    Logger
]);
