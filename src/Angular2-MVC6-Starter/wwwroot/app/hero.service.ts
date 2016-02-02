import {Injectable} from 'angular2/core';
import { Http, HTTP_PROVIDERS, Response, Headers } from 'angular2/http';
import {Hero} from './hero';
import {Logger} from './logger.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HeroService {
    
    private endPoint: string = 'http://localhost:57275/api/Heroes/';

    constructor(public _http: Http, private _logger: Logger) { }
    
    getHeroes(): Observable<Array<Hero>> {
        
       return this._http
           .get(this.endPoint)
           .map((res: Response) => res.json())
           // this additional map is required to convert json array to a valid js Hero[] obj
           .map((json: any) => {
               let heroes: Array<Hero> = [];
               json.forEach(h => {
                   let hero: Hero = new Hero(  h.Id as number,
                                               h.Name as string,
                                               h.Power as string,
                                               h.ExtraPower as string,
                                               h.AlterEgo as string
                   );
                   heroes.push(hero);
               });
               return heroes;
           });
    }
    
  	getHero(id: number) {
        
        return this._http
            .get(this.endPoint + id)
            .map((res: Response) => res.json())
            // this additional map is required to convert json hero to a valid js Hero obj
            .map((json: any) => {
                let hero: Hero = new Hero(  json.Id as number,
                                            json.Name as string,
                                            json.Power as string,
                                            json.ExtraPower as string,
                                            json.AlterEgo as string
                );
                return hero;
            });
	}
    
    saveHero(hero: Hero) {
        
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        this._http.post(this.endPoint, JSON.stringify(hero), {headers: headers})
            .map(res => res.json)
            .subscribe(
                data => this._logger.log(data),
                err => this._logger.error(err),
                () => this._logger.log('Hero save complete!')
            );   
    }
    
    deleteHero(id: number) {
        
        this._http.delete(this.endPoint + id)
            .map(res => res.json)
            .subscribe(
                data => this._logger.log(data),
                err => this._logger.error(err),
                () => this._logger.log('Hero delete complete!')
            );
    }
}
