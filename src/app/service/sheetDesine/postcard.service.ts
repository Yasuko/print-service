import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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
                postcode: [48, 20, 0, 0, 8.5],
                address1: [92, 32, 0, 0, 6],
                address2: [84, 40, 0, 0, 6],
                building: [76, 45, 0, 0, 6],
                name1: [54, 40, 0, 0, 10],
                title: [54, 132, 0, 0, 10]},
            company: {
                postcode: [48, 20, 0, 0, 8.5],
                address1: [92, 32, 0, 0, 6],
                address2: [84, 40, 0, 0, 6],
                building: [76, 45, 0, 0, 6],
                company: [65, 35, 0, 0, 6],
                department: [57, 40, 0, 0, 6],
                name1: [46, 40, 0, 0, 10],
                title: [46, 132, 0, 0, 10]},
            twise: {
                postcode: [48, 20, 0, 0, 8.5],
                address1: [92, 32, 0, 0, 6],
                address2: [84, 40, 0, 0, 6],
                building: [76, 45, 0, 0, 6],
                name1: [60, 40, 0, 0, 10],
                name2: [46, 40, 0, 0, 10],
                title: [54, 132, 0, 0, 10]},
            myAddress: {
                myPostcode: [8, 143, 0, 0, 5],
                myAddress: [29, 50, 0, 0, 4.5],
                myBuilding: [24, 50, 0, 0, 4.5],
                myName: [10, 60, 0, 0, 8]},
            myAddressNewYear: {
                myPostcode: [8, 127, 0, 0, 5],
                myAddress: [29, 40, 0, 0, 4.5],
                myBuilding: [24, 40, 0, 0, 4.5],
                myName: [10, 45, 0, 0, 8]},
        };
        return desine[type];
    }
}
