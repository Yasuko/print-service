import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
// import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class PrintDataService {

    private serverUrl = 'server/index.php';
    private headerJson: Headers = new Headers({'Content-Type': 'application/json'});
    private job = '_m';

    private responseStatus: any[] = [];

    constructor(private http: Http) {}

    getPrintDatas(): Promise<string[]> {
        if (this.monsters.length > 1) {
            return new Promise((resolve, reject) => {
                resolve(this.monsters);
            });
        } else {
            let data = {};
            data['job'] = 'get' + this.job;
            data['id'] = 'all';

            return this.http
                .post(this.serverUrl,
                     JSON.stringify(data),
                    { headers: this.headerJson } )
                .toPromise()
                .then(response => {
                    this.monsters = response.json();
                    return response.json() as Monster[];
                })
                .catch(this.handleError);
        }
    }

    getMonster(id: number): Promise<Monster> {
        if (this.monsters.length > 1) {
            return new Promise((resolve, reject) => {
                resolve(this.monsters[id]);
            });
        } else {
            const data = {};
            data['job'] = 'get' + this.job;
            data['id'] = `${id}`;

            return this.http
                .post(this.serverUrl,
                    JSON.stringify(data),
                    { headers: this.headerJson } )
                .toPromise()
                .then((response: Response) => response.json() as Monster)
                .catch(this.handleError);
        }
    }
    create(monster: Monster): Promise<Monster> {

        const addData: Monster = monster;
        addData['job'] = 'add' + this.job;

        return this.http
            .post(this.serverUrl,
                JSON.stringify(addData),
                { headers: this.headerJson } )
            .toPromise()
            .then((response: Response) => {
                this.responseStatus = response.json();
                this.monsters[(monster.id - 1)] = monster;
            })
            .catch(this.handleError);
    }

    update(monster: Monster): Promise<Monster> {

        const updata: Monster = monster;
        updata['job'] = 'update' + this.job;

        return this.http
            .post(this.serverUrl,
                JSON.stringify(updata),
                { headers: this.headerJson } )
            .toPromise()
            .then((response: Response) => {
                this.responseStatus = response.json();
                this.pullConsole('Update Monster :' + this.monsters[(monster.id - 1)].Name);
                for (const key in monster) {
                    if (monster.hasOwnProperty(key)) {
                        this.monsters[(monster.id - 1)][key] = monster[key];
                    }
                }
                this.monsters[(monster.id - 1)] = monster;
            })
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        return this.http
            .delete(this.serverUrl, {headers: this.headerJson})
            .toPromise()
            .then((response: Response) => this.responseStatus = response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    private pullConsole(mess: any): void {
        if (this.debug) {
            console.log(mess);
        }
    }

}
