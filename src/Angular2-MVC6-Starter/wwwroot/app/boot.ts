import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {Http, HTTP_PROVIDERS, Response} from 'angular2/http';
import {HeroService} from './hero.service';
import {AppComponent} from './app.component';
import {Logger} from './logger.service';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    HeroService,
    Logger
]);
