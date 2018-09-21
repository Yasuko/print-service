import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class LayoutStatusService {

    flags = {
        onDrag: false,
        main: true,
        onSheetSize: false,
        onLoadSVG: false,
            onDragSVGFile: true,
            onPreviewSVGFile: false,
        onEdit: false,
        onReview: false,
        onSave: false,

    };
    sheetSpec = {
        vertical: true,
        side: false,
        a6: false,
        a5: false,
        a4: false,
        a3: false,
        b6: false,
        b5: false,
        b4: false,
        b3: false
    };

    sheetSize = {
        a7: [74, 105],
        a6: [105, 148],
        a5: [148, 210],
        a4: [210, 297],
        a3: [297, 420],
        a2: [420, 594],
        b7: [91, 128],
        b6: [128, 182],
        b5: [182, 257],
        b4: [257, 364],
        b3: [364, 515],
        b2: [515, 728]
    };
    desineFlagsAddress = {
        address1: false,
        address2: false,
        address3: false
    };
    desineFlagsCompany = {
        company1: false,
        company2: false
    };
    desineFlagsName = {
        twice: false,
        myName: false
    };
    printSheetDesine = '';


    constructor() {}

}
