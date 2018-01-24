import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
// import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { PrintData } from './printData';
import { PrintText } from './printText';

@Injectable()

export class PrintDataService {

    private debug = true;
    private serverUrl = 'server/aj';
    private headerJson: Headers = new Headers({'Content-Type': 'application/json'});

    private responseStatus: any[] = [];
    private printData: PrintData[] = new Array();
    private printText: PrintText[] = new Array();

    constructor(private http: Http) {}

    getAllPrintData(): Promise<PrintData[]> {
        const data = {'job' : '', 'id' : ''};
        data['job'] = 'get_p';
        data['id'] = 'all';

        return this.http
            .post(this.serverUrl,
                JSON.stringify(data),
                { headers: this.headerJson } )
            .toPromise()
            .then(response => {
                this.printData = response.json() as PrintData[];
                return this.printData;
            })
            .catch(this.handleError);
    }

    getPrintData(id): Promise<PrintData> {
        if (this.printData[id] === undefined) {
            return this.getAllPrintData()
                .then(print => {
                    return print[id];
                });
        } else {
            return new Promise((resolve, reject) => resolve(this.printData[id]));
        }
    }

    getText(id: number): Promise<PrintText[]> {
        const data = {};
        data['job'] = 'get_t';
        data['print_id'] = Number(id);

        return this.http
            .post(this.serverUrl,
                JSON.stringify(data),
                { headers: this.headerJson } )
            .toPromise()
            .then((response: Response) => response.json() as PrintText[])
            .catch(this.handleError);
    }
    setPrint(print: PrintData): Promise<PrintData> {

        const addData: PrintData = print;
        addData['job'] = 'add_p';

        return this.http
            .post(this.serverUrl,
                JSON.stringify(addData),
                { headers: this.headerJson } )
            .toPromise()
            .then((response: Response) => response.json() as PrintData)
            .catch(this.handleError);
    }
    setText(text: PrintText[]): Promise<any> {

        const addData = {'data': text, 'job': 'add_t'};

        return this.http
            .post(this.serverUrl,
                JSON.stringify(addData),
                { headers: this.headerJson } )
            .toPromise()
            .then((response: Response) => response.json())
            .catch(this.handleError);
    }
    setTextMulti(text: PrintText[], id: number): Promise<any> {
        for (const key in text) {
            if (text.hasOwnProperty(key)) {
                text[key]['print_id'] = Number(id);
            }
        }
        const addData = {'data': text, 'job': 'add_t'};

        return this.http
            .post(this.serverUrl,
                JSON.stringify(addData),
                { headers: this.headerJson } )
            .toPromise()
            .then((response: Response) => response.json())
            .catch(this.handleError);
    }
    updatePrint(print: PrintData): Promise<PrintData> {

        const updata: PrintData = print;
        updata['job'] = 'update_p';

        return this.http
            .post(this.serverUrl,
                JSON.stringify(updata),
                { headers: this.headerJson } )
            .toPromise()
            .then((response: Response) => {
                this.printData[print.id] = response.json() as PrintData;
                return this.printData[print.id];
            })
            .catch(this.handleError);
    }

    updateText(text: PrintText[], id: number): Promise<PrintText[]> {
        for (const key in text) {
            if (text.hasOwnProperty(key)) {
                if (!text[key].hasOwnProperty('print_id')) {
                    text[key]['print_id'] = Number(id);
                }
            }
        }
        const updata = {'data': text, 'job': 'update_t'};

        return this.http
            .post(this.serverUrl,
                JSON.stringify(updata),
                { headers: this.headerJson } )
            .toPromise()
            .then((response: Response) => {
                this.printText = response.json() as PrintText[];
            })
            .catch(this.handleError);
    }

    deletePrint(id: number): Promise<void> {

        const del = {'data': id, 'job': 'delete_p'};

        return this.http
            .post(this.serverUrl,
                JSON.stringify(del),
                {headers: this.headerJson})
            .toPromise()
            .then((response: Response) => this.responseStatus = response.json())
            .catch(this.handleError);
    }
    deleteText(id: number): Promise<PrintText[]> {

        const del = {'data': id, 'job': 'delete_t'};

        return this.http
            .post(this.serverUrl,
                JSON.stringify(del),
                {headers: this.headerJson})
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
