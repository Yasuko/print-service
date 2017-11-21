import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class PostcardService {

    private responseStatus: any[] = [];

    constructor() {}

    getLabelSheetSpec(type: string): number[] {
        const spec = {
            cell10: [25, 10, 89, 48, 2, 0],
            cell12: [23.3, 7, 96.5, 44.5, 0, 2.5],
            cell24: [12.9, 6, 66, 33.9, 0, 0],
        };
        return spec[type];
    }

    getLabelSheetDesineClass(id: number): string {
        const desine = [
            'sheet_line1', 'sheet_line2', 'sheet_line3',
            'sheet_line4', 'sheet_line5', 'sheet_address3',
            'sheet_address4', 'sheet_address5'
        ];
        return ;
    }

    getPostcardDesine(type: string) {
        const desine = {
            address: {
                postcode: [50, 5, 0, 0, 10],
                address1: [90, 15, 0, 0, 10],
                address2: [80, 15, 0, 0, 10],
                building: [70, 50, 0, 0, 10],
                name1: [45, 20, 0, 0, 12]},
            company: {
                postcode: [50, 5, 0, 0, 10],
                address1: [0, 0, 0, 0, 0],
                address2: [0, 0, 0, 0, 0],
                building: [0, 0, 0, 0, 0],
                company: [0, 0, 0, 0, 0],
                department: [0, 0, 0, 0, 0],
                name1: [0, 0, 0, 0, 0]},
            twise: {
                postcode: [50, 5, 0, 0, 10],
                address1: [0, 0, 0, 0, 0],
                address2: [0, 0, 0, 0, 0],
                building: [0, 0, 0, 0, 0],
                name1: [0, 0, 0, 0, 0],
                name2: [0, 0, 0, 0, 0]},
            myAddress: {
                myPostcode: [2, 50, 0, 0, 7],
                myAddress: [20, 55, 0, 0, 7],
                myBuilding: [20, 55, 0, 0, 7],
                myName: [15, 60, 0, 0, 8]},
        };
        return desine[type];
    }
}
