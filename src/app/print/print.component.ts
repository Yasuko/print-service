import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PrintStatusService } from './print-status.service';
import { PrintDataService } from '../service/index';
import { PrintData, PrintText } from '../service/index';

import { fadeInAnimation, alertAnimation } from '../_lib_service/index';

// Import TherdParty Service
import { PdfMakerService, PrintLayoutService, ImageMakerService } from '../_lib_service/index';


@Component({
    selector: 'print-edit',
    templateUrl: './print.component.html',
    styleUrls: ['./print.scss'],
    animations: [ fadeInAnimation, alertAnimation ],
})

export class PrintComponent implements OnInit {

    loader = 'default';
    loadMessage = '読み込み中';
    alert = 'hide';
    alertMessage = '';
    flags;
    sheetSpec;
    sheetSize;
    formStatus;
    inputForm;
    nameTitles;
    editResolution = 3;

    fname = '';
    name = '';
    onDrag = false;
    reader;

    loadSVGData;
    direction;

    layoutLists: PrintData[] = [];
    textLists: PrintText[] = [];
    editLayout: PrintData = new PrintData;
    editSheetSize = 'a4';
    editSheetDirection = 'vertical';

    sheetWidth = 0;
    sheetHeight = 0;
    pageSize = 'a4';

    editWidth = 0;
    editHeight = 0;

    printImage;
    svgBox;


    // subscription: Subscription;
    constructor(
        private router: Router,
        private sanitizer: DomSanitizer,
        private printStatusService: PrintStatusService,
        private printDataService: PrintDataService,
        private imageMakerService: ImageMakerService
    ) {
        this.flags = this.printStatusService.flags;
        this.sheetSpec = this.printStatusService.sheetSpec;
        this.sheetSize = this.printStatusService.sheetSize;
    }

    ngOnInit(): void {
        this.getALLPrintData();
    }

    /** ********************************************
    * テキストの移動
    ******************************************** */

    getALLPrintData(): void {
        this.printDataService.getAllPrintData()
            .then((print: PrintData[]) => {
                this.layoutLists = [];
                this.layoutLists = print;
            });
    }
    getPrintData(id: number): void {
        this.printDataService.getPrintData(id)
            .then((print: PrintData) => {
                this.editLayout = print;
                this.setupSheetType(this.editLayout.size);
                this.setupSheetDirection(this.editLayout.direction);
                this.getPrintText(this.editLayout.id);
                this.moveWindow('edit');
            });
    }
    getPrintText(id: number): void {
        this.printDataService.getText(id)
            .then((texts: PrintText[]) => this.textLists = texts);
    }



    /** ********************************************
         *
         * 画面毎の処理
         *
    ******************************************** */

    setLoadSVG(): void {
        this.moveWindow('edit');
    }
    setEdit(id: number): void {
        this.getPrintData(id);

    }
    setPrint(): void {
        this.buildIMage();
    }


    /** ******************************************
    * 数値計算、移動先計算他、補助ライブラリ
    ****************************************** */

    /**
    * 画面切り替え
    * @param window 移動先
    */
    moveWindow(window: string): void {
        for (const key in this.flags) {
            if (this.flags.hasOwnProperty(key)) {
                this.flags[key] = false;
            }
        }
        console.log(window);
        if (window === 'main') {
            this.flags.main = true;
        } else if (window === 'edit') {
            this.flags.onEdit = true;
        } else if (window === 'print') {
            this.flags.onDownload = true;
        }
    }

    setupSheetType(desine): void {
        this.editSheetSize = desine;
        for (const key in this.sheetSpec) {
            if (this.sheetSpec.hasOwnProperty(key)) {
                if (key !== 'vertical' && key !== 'side') {
                    if (desine === key) {
                        this.sheetSpec[key] = true;
                        const sheet = this.sheetSize[key];
                        if (this.sheetSpec['vertical'] === true) {
                            this.sheetWidth = sheet[0];
                            this.sheetHeight = sheet[1];
                            this.pageSize = key;
                        } else {
                            this.sheetWidth = sheet[1];
                            this.sheetHeight = sheet[0];
                            this.pageSize = key;
                        }
                    } else {
                            this.sheetSpec[key] = false;
                    }
                }
            }
        }
        this.editWidth = this.sheetWidth * this.editResolution;
        this.editHeight = this.sheetHeight * this.editResolution;
    }
    setupSheetDirection(rotate: string): void {
        this.editSheetDirection = rotate;
        this.sheetSpec['vertical'] = (rotate === 'vertical') ? true : false;
        this.sheetSpec['side'] = (rotate === 'side') ? true : false;
        this.setupSheetType(this.editSheetSize);
    }
    /**
     * 読み込み中画面表示
     * @param message
     */
    setupLoading(message: string): void {
        this.loader = 'loading';
        this.loadMessage = message;
    }
    setupLoadend(): void {
        this.loader = 'loadend';
        this.loadMessage = '';
    }
    /**
     * アラート画面表示
     * @param message
     */
    setupAlert(message: string): void {
        this.alert = 'show';
        this.alertMessage = message;
        setTimeout(() => {
            this.alert = 'hide';
            this.alertMessage = '';
        }, 2000);
    }

    checkNull(cell): boolean {
        return (cell !== '') ? true : false;
    }
    /**
    * 初期パラメーターの初期化
    */
    reset(type: string): void {
        this.editLayout = new PrintData;
        this.editSheetSize = 'a4';
        this.editSheetDirection = 'vertical';
        this.textLists = [];
    }

    /**
     * タックシートイメージ画像作成
     */
    buildIMage(): void {
        this.imageMakerService.setResulution(13.78095);
        this.imageMakerService.setSheetSize(this.sheetWidth, this.sheetHeight);
        this.imageMakerService.setSheetBackground(this.editLayout.template);
        this.imageMakerService.setPrintTextts(this.textLists);
        this.imageMakerService.sheetMaker().then(
            (img) => {
                this.printImage = img;
                // console.log(this.printImage);
                this.buildPdf();
            }
        );
    }

    /**
    * PDFファイル作成
    */
    buildPdf(): void {
        const pdfmakerService: PdfMakerService = new PdfMakerService;
        const printLayoutService: PrintLayoutService = new PrintLayoutService;
        console.log(this.sheetWidth);
        printLayoutService.setSheetSize(this.pageSize);
        printLayoutService.setSheetSpec(this.sheetWidth, this.sheetHeight);
        const layout = printLayoutService.makePdfLayout(this.printImage);
        const pdf = pdfmakerService.testPdfMake(layout);
        pdf.print();
    }
}
