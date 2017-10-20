import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
// Import TherdParty Service
import { PdfMakerService } from '../_lib_service/index';
import { ListLayoutService, RecruiteLayoutService } from '../_lib_service/index';


@Component({
    selector: 'tacksheet-print',
    templateUrl: './tacksheet.component.html',
    styleUrls: ['./tacksheet.scss']
})

export class TacksheetComponent {

    flags = {
        onFileLoad: false,
            onPicuture: true,
            onReview: false,
            onFaceCat: false,
        onDrag: false,
        onType: true,
        onSheetSpec: true,
        onSheetDesine: true,
        onIncludeCSV: false,
        onDownload: false,
        onLoad: false
    };

    sheetStatus = {
        pageMarginTop: 0,
        pageMarginLeft: 0,
        LabelWidth: 0,
        LabelHeight: 0,
        LabelMarginTop: 0,
        LabelMarginLeft: 0
    };

    reader = new FileReader();
    catOn = false;
    pdfOn = false;

    fname = '';
    name = '';

    onImage = '';
    moveSwitch = false;
    mouseMoveCheckX = 0;
    mouseMoveCheckY = 0;
    mouseMoveBaseX = 0;
    mouseMoveBaseY = 0;
    mouseMoveX = 0;
    mouseMoveY = 0;

    transformSwitch = false;
    mouseTranseW = 0;
    mouseTranseH = 0;

    x = 0;
    y = 0;
    width = 200;
    height = 300;

    canvasBase: HTMLCanvasElement;
    canvasImage: HTMLImageElement;
    canvasWidth;
    canvasHeight;
    canvasRatio;

    subscription: Subscription;
    constructor(
        private router: Router,
        private pdfmakerService: PdfMakerService,
        private listlayoutService: ListLayoutService,
        private recruitelayoutService: RecruiteLayoutService
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
        if (this.canvasImage) {
            this.reset('last');
        }
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

    }

    sheetDesiner(): void {

    }


    reset(type: string): void {
        if (type === 'last') {

        } else if (type === 'first') {
            this.reader = null;
            this.canvasImage = null;
            this.canvasBase = null;
            this.canvasImage = null;
            this.mouseMoveCheckX = null;
            this.mouseMoveCheckY = null;
            this.catOn = false;
            this.moveSwitch = false;
        }
    }

    buildPdf(): void {
        this.recruitelayoutService.setImage(this.canvasBase.toDataURL('image/png'));
        this.recruitelayoutService.setFName(this.fname);
        this.recruitelayoutService.setName(this.name);
        const layout = this.recruitelayoutService.makePdfLayout();
        const pdf = this.pdfmakerService.testPdfMake(layout);
        pdf.print();
    }

}
