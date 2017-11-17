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

    getLabelSheetDesine(type: string) {
        const desine = {
            address1: { input: [1, 1, 0, 0, 0, 0, 1, 0, 0], font: 15},
            address2: { input: [1, 1, 0, 0, 0, 0, 0, 0, 0], font: 15},
            address3: { input: [1, 1, 1, 0, 0, 0, 0, 0, 0], font: 12},
            company1: { input: [0, 0, 0, 0, 1, 0, 0, 0, 0], font: 10},
            company2: { input: [1, 1, 1, 1, 1, 0, 0, 0, 0], font: 8},
            twise: { input: [0, 0, 0, 0, 0, 1, 1, 0, 1], font: 15},
            myName: {}
        };

        return desine[type];
    }

}
