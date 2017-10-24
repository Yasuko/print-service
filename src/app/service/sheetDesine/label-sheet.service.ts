import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class LavelSheetService {

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

    getLabelSheetDesine(type: string) {
        const desine = {
            line1: { input: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], font: 20, height: 30 },
            line2: { input: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], font: 15, height: 20 },
            line3: { input: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], font: 12, height: 15 },
            line4: { input: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0], font: 10, height: 10 },
            line5: { input: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0], font: 8, height: 10 },
            line3address: { input: [0, 0, 0, 0, 0, 1, 1, 0, 0, 1], font: 15, height: 20 },
            line4address: { input: [0, 0, 0, 0, 0, 1, 1, 1, 0, 1], font: 12, height: 15 },
            line5address: { input: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1], font: 10, height: 10 },
        };

        return desine[type];
    }

}
