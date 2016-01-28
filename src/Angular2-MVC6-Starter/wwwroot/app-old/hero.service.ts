import {Injectable} from 'angular2/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';
import {BackendService} from './backend.service';
import {Logger} from './logger.service';

@Injectable()
export class HeroService {
    constructor(private _logger: Logger, private _backend: BackendService) { }

    private _heroes: Hero[] = [];

    getHeroesGood() {
        this._backend.getAllHttp().then((heroes: Hero[]) => {
            this._logger.log(`Fetched ${heroes.length} heroes.`);
            this._heroes.push(...heroes); // fill cache
        });
        return this._heroes;
    }

    getHeroes() {
        this._backend.getAllFetchWithout().then((heroes: any) => {
            heroes.forEach(h => this._heroes.push(new Hero(h.Id, h.Name, h.Power)));
            this._logger.log(`Fetched ${heroes.length} heroes.`);
            this._heroes.push(...heroes); // fill cache
        });
        return this._heroes;
    }

    getTopHeroes(count: number) {
        this._backend.getAllFetch().then((heroes: Hero[]) => {
            this._logger.log(`Fetched ${heroes.length} heroes.`);
            this._heroes.push(...heroes.slice(1, count + 1)); // fill cache
        });
        return this._heroes;
    }

    getHero(id: number) {
        return Promise.resolve(this._backend.heroes)
       .then(heroes => heroes.filter(h => h.id === id)[0]);
	}
}
