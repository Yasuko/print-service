import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class TacksheetStatusService {

    flags = {
        onDrag: false,
        onType: true,
        onSheetSpec: false,
        onSheetDesine: false,
        onPrintPosition: false,
        onLoadCSV: false,
        onIncludeCSV: false,
            onDragCSVFile: true,
            onPreviewCSVFile: false,
        onInputContents: false,
        onReviewCSV: false,
        onDownload: false,
        onLoad: false,
        onFileLoad: false,
            onFiles: true,
            onReview: true
    };

    sheetStatus = {
        pageMarginTop: 0,
        pageMarginLeft: 0,
        LabelWidth: 0,
        LabelHeight: 0,
        LabelMarginTop: 0,
        LabelMarginLeft: 0
    };
    printSheetDesine = '';
    printStartPosition = 0;
    printCellCount = 1;
    formStatus = {
        line1: '',
        line2: '',
        line3: '',
        line4: '',
        line5: '',
        postcode: '',
        address: '',
        building: '',
        company: '',
        name: '',
    };
    inputForm = {
        line1: false,
        line2: false,
        line3: false,
        line4: false,
        line5: false,
        postcode: false,
        address: false,
        building: false,
        company: false,
        name: false
    };

    constructor() {}

}
