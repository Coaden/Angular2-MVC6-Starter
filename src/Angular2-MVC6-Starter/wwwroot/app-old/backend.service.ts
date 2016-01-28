import {Injectable, Type} from 'angular2/core';
import {HTTP_PROVIDERS, Http, Response} from 'angular2/http';
import {Logger} from './logger.service';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import 'rxjs/add/operator/map'

@Injectable()
export class BackendService {
    public heroes: Hero[] = [];

    constructor(private _logger: Logger, private _http: Http) { }

    getAllMock(type: Type): PromiseLike<any[]> {
        return Promise.resolve<Hero[]>(HEROES);

        let err = new Error('Cannot get object of this type');
        this._logger.error(err);
        throw err;
    }

    getAllHttp() {

        return new Promise(resolve =>
            this._http.get('http://localhost:57275/api/Heroes')
                .map((res: Response) => res.json())
                .subscribe(
                    data => {
                        this.heroes = [];
                        data.forEach(d => {
                            this.heroes.push(new Hero(d.Id, d.Name, d.Power));
                        });
                        resolve(this.heroes);
                    },
                    err => this._logger.error(err),
                    () => {
                        this._logger.log('Heroes Fetch Complete');
                    }
                )
            );

        let err = new Error('Cannot get object of this type');
        this._logger.error(err);
        throw err;
    }

    getAllFetch() {
        return new Promise(resolve => fetch('http://localhost:57275/api/Heroes')
            .then((result: any) => result.json())
            .then((json: any) => {
                this.heroes = [];
                json.forEach(d => {
                    this.heroes.push(new Hero(d.Id, d.Name, d.Power));
                    resolve(this.heroes);
                });
            })
        );

        let err = new Error('Cannot get object of this type');
        this._logger.error(err);
        throw err;
    }

    getAllFetchWithout() {
        return window.fetch('http://localhost:57275/api/Heroes')
            .then((result: any) => result.json())
    }

    
}