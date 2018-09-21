import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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
            line1: { input: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], font: 20, height: 30 },
            line2: { input: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], font: 15, height: 20 },
            line3: { input: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], font: 12, height: 15 },
            line4: { input: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0], font: 10, height: 10 },
            line5: { input: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0], font: 8, height: 10 },
            address3: { input: [0, 0, 0, 0, 0, 1, 1, 0, 0, 1], font: 15, height: 20 },
            address4: { input: [0, 0, 0, 0, 0, 1, 1, 1, 0, 1], font: 12, height: 15 },
            address5: { input: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1], font: 10, height: 10 },
        };

        return desine[type];
    }

}
