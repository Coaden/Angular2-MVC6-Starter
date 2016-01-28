import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HeroService} from './hero.service';
import {BackendService} from './backend.service';
import {AppComponent} from './app.component';
import {Logger} from './logger.service';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    Http,
    HTTP_PROVIDERS,
    BackendService,
    HeroService,
    Logger
]);

