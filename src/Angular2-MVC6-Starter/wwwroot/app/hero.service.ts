import {Injectable} from 'angular2/core';
import {Hero} from './hero';
import {Logger} from './logger.service';

@Injectable()
export class HeroService {

    private _heroes: Hero[] = [];
    
    constructor(private _logger: Logger) { }

    getHeroes(): PromiseLike<Hero[]> {
        
        // if(this._heroes.length > 0)
        //     return Promise.resolve(this._heroes);

        return new Promise(resolve => fetch('http://localhost:57275/api/Heroes')
            .then((result: any) => result.json())
            .then((json: any) => {
                this._heroes = [];
                json.forEach(h => {
                    let hero: Hero = new Hero(<number>h.Id, 
                                <string>h.Name, 
                                <string>h.Power,
                                <string>h.ExtraPower,
                                <string>h.AlterEgo
                                );
                    this._heroes.push(hero);
                });
                resolve(this._heroes);
            })
            .catch((error) => {
                this._logger.error(error.message);
            })    
        );
	}

	getHero(id: number) {
        return this.getHeroes()
        .then(heroes => heroes.filter(h => h.id === id)[0]);
	}
    
    saveHero(hero: Hero) {

        fetch('http://localhost:57275/api/Heroes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hero)
        })
       .then((result: any) => result.json())
       .then((json) => {
            hero.id = json.Id;
        })
        .catch((error) => {
            this._logger.error(error.message);
        });       
    }
    
    deleteHero(id: number) {

        fetch('http://localhost:57275/api/Heroes/' + id, {
            
            method: 'DELETE',
        })
       .then((result: any) => result.json())
       .then((json) => {})
       .catch((error) => {
           this._logger.error(error.message);
       });      
    }
}
