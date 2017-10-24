import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
// Import TherdParty Service
import { PdfMakerService } from '../_lib_service/index';
import { ListLayoutService, RecruiteLayoutService } from '../_lib_service/index';
// Import Service
import { LavelSheetService } from '../service/sheetDesine/index';

@Component({
    selector: 'tacksheet-print',
    templateUrl: './tacksheet.component.html',
    styleUrls: ['./tacksheet.scss']
})

export class TacksheetComponent {

    flags = {
        onDrag: false,
        onType: true,
        onSheetSpec: false,
        onSheetDesine: false,
        onPrintPosition: false,
        onLoadCSV: false,
        onIncludeCSV: false,
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
    printStartPosition = 0;
    inputForm = {
        line1: false,
        line2: false,
        line3: false,
        line4: false,
        line5: false,
        address1: false,
        address2: false,
        address3: false,
        address4: false,
        address5: false
    };

    cellCounter = [];
    reader = new FileReader();
    catOn = false;
    pdfOn = false;

    fname = '';
    name = '';


    subscription: Subscription;
    constructor(
        private router: Router,
        private pdfmakerService: PdfMakerService,
        private listlayoutService: ListLayoutService,
        private recruitelayoutService: RecruiteLayoutService,
        private labelsheetSetvice: LavelSheetService
    ) {}

    onDragOverHandler(event: DragEvent): void {
        event.preventDefault();

    }
    onDragLeaveHandler(event: DragEvent): void {
        event.stopPropagation();
    }
    /**
     * ファイルドロップイベント
     * @param event ドラッグされたファイル
     */
    onDropHandler(event: DragEvent): void {
        event.preventDefault();
        this.reset('fast');

        const files = event.dataTransfer.files;
        this.reader = new FileReader();

        // データタイプの判定
        if (!files[0] || files[0].type.indexOf('image/') < 0) {

        } else {
            this.reader.onloadend = (e) => {

            };
            this.reader.readAsDataURL(files[0]);
        }
        event.stopPropagation();
    }

    setSheetType(id: number): void {
        if (id === 12) {
            this.setupSheetSpec('cell12');
        } else if (id === 24) {
            this.setupSheetSpec('cell24');
        } else if (id === 10) {
            this.setupSheetSpec('cell10');
        }

        this.moveWindow('spec');
    }
    setSheetSpec(): void {
        this.moveWindow('desine');
    }
    setSheetDesine(type: string): void {
        this.setupSheetDesine(type);
        this.moveWindow('position');
    }
    setPrintPosition(): void {
        this.moveWindow('loadcsv');
    }
    setLoadCSV(choice): void {
        if (choice) {
            this.moveWindow('includecsv');
        } else {
            this.moveWindow('input');
        }
    }
    setIncludeCSV(): void {
        this.moveWindow('reviewcsv');
    }
    setInputContents(): void {
        this.moveWindow('reviewcsv');
    }
    setReviewCSV(): void {
        this.moveWindow('download');
    }

    sheetDesiner(): void {
        const verticalLine = Math.floor(
            (297 - (this.sheetStatus.pageMarginTop))
            / (this.sheetStatus.LabelHeight + this.sheetStatus.LabelMarginTop));
        const sideLine = Math.floor(
            (210 - (this.sheetStatus.pageMarginLeft))
            / (this.sheetStatus.LabelWidth + this.sheetStatus.LabelMarginLeft));
        const sheets = sideLine * verticalLine;

        console.log(sideLine + '::' + verticalLine);

        if (sheets > 1 && sheets !== Infinity) {
            this.cellCounter = new Array(sheets);
        }
    }

    setPrintStartIndex(id: number): void {
        this.printStartPosition = id;
    }
    setupSheetSpec(spec: string): void {
        const data = this.labelsheetSetvice.getLabelSheetSpec(spec);
        this.sheetStatus.pageMarginTop = data[0];
        this.sheetStatus.pageMarginLeft = data[1];
        this.sheetStatus.LabelWidth = data[2];
        this.sheetStatus.LabelHeight = data[3];
        this.sheetStatus.LabelMarginTop = data[4];
        this.sheetStatus.LabelMarginLeft = data[5];

        this.sheetDesiner();
    }
    setupSheetDesine(desine: string): void {
        const data = this.labelsheetSetvice.getLabelSheetDesine(desine);
        let count = 0;
        for (const key in this.inputForm) {
            if (this.inputForm.hasOwnProperty(key)) {
                this.inputForm[key] = data['input'][count];
                count++;
            }
        }
    }

    moveWindow(window: string): void {
        for (const key in this.flags) {
            if (this.flags.hasOwnProperty(key)) {
                this.flags[key] = false;
            }
        }
        if (window === 'type') {
            this.flags.onType = true;
        } else if (window === 'spec') {
            this.flags.onSheetSpec = true;
        } else if (window === 'desine') {
            this.flags.onSheetDesine = true;
        } else if (window === 'position') {
            this.flags.onPrintPosition = true;
        } else if (window === 'loadcsv') {
            this.flags.onLoadCSV = true;
        } else if (window === 'includecsv') {
            this.flags.onIncludeCSV = true;
        } else if (window === 'input') {
            this.flags.onInputContents = true;
        } else if (window === 'reviewcsv') {
            this.flags.onReviewCSV = false;
        } else if (window === 'download') {
            this.flags.onDownload = false;
        }

    }
    reset(type: string): void {
        if (type === 'last') {

        } else if (type === 'first') {
            this.reader = null;
            this.catOn = false;
        }
    }

    buildPdf(): void {
        this.recruitelayoutService.setFName(this.fname);
        this.recruitelayoutService.setName(this.name);
        const layout = this.recruitelayoutService.makePdfLayout();
        const pdf = this.pdfmakerService.testPdfMake(layout);
        pdf.print();
    }

}
