import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// Import TherdParty Service
import { PdfMakerService } from '../_lib_service/index';
import { TacksheetLayoutService, TacksheetMakerService } from '../_lib_service/index';
// Import Service
import { LavelSheetService } from '../service/sheetDesine/index';
import { TacksheetStatusService } from './tacksheet-status.service';
@Component({
    selector: 'tacksheet-print',
    templateUrl: './tacksheet.component.html',
    styleUrls: ['./tacksheet.scss']
})

export class TacksheetComponent {

    flags;
    sheetStatus;
    printSheetDesine = '';
    printStartPosition = 0;
    printCellCount = 1;
    formStatus;
    inputForm;

    sheetContent = [];
    sheetContentPreview = [];
    sheetPreviewImage;
    sheetPrintImage;

    previewClass = '';
    previewScale = 0.1;
    cellCounter = [];
    reviewStyle = ['ghost-cell'];

    reader = new FileReader();
    readCSVFile = [];
    readCSVEncode = {utf: false, sjis: true};

    fname = '';
    name = '';
    onDrag = false;

    subscription: Subscription;
    constructor(
        private router: Router,
        private pdfmakerService: PdfMakerService,
        private labelsheetSetvice: LavelSheetService,
        private tacksheetStatusService: TacksheetStatusService,
        private tacksheetmakeService: TacksheetMakerService,
        private tacksheetlayoutService: TacksheetLayoutService
    ) {
        this.flags = tacksheetStatusService.flags;
        this.sheetStatus = tacksheetStatusService.sheetStatus;
        this.formStatus = tacksheetStatusService.formStatus;
        this.inputForm = tacksheetStatusService.inputForm;
    }

    /** ********************************************
     * ドラッグイベント
    ******************************************** */

    /**
     *
     * @param event ドラッグイベント
     */
    onDragOverHandler(event: DragEvent): void {
        event.preventDefault();
        this.onDrag = true;
    }
    onDragLeaveHandler(event: DragEvent): void {
        event.stopPropagation();
        this.onDrag = false;
    }
    /**
     * ファイルドロップイベント
     * @param event ドラッグされたファイル
     */
    onDropHandler(event, type: string): void {
        event.preventDefault();
        this.reset('fast');

        let files;
        if (type === 'drag') {
            files = event.dataTransfer.files;
        } else if (type === 'select') {
            files = event.target.files;
        }

        this.reader = new FileReader();

        // データタイプの判定
        if (!files[0] || files[0].type.indexOf('image/') > 0) {
        } else {
            const result = [];
            this.reader.onloadend = (e) => {
                const body = this.reader.result.split('\n');
                for (let j = 0; j < body.length; j++) {
                    result[j] = body[j].split(',');
                }
                const jb = JSON.stringify(result);
                this.readCSVFile = JSON.parse(jb);
            };
            const encode = (this.readCSVEncode.sjis) ? 'Shift_JIS' : 'UTF-8';
            this.reader.readAsText(files[0], encode);

            this.switchLoadtoPreview();

        }
        event.stopPropagation();
    }
    switchLoadtoPreview(): void {
        if (this.flags.onPreviewCSVFile) {
            this.flags.onPreviewCSVFile = false;
            this.flags.onDragCSVFile = true;
        } else {
            this.flags.onPreviewCSVFile = true;
            this.flags.onDragCSVFile = false;
        }

    }
    setupEncode(encode: string): any {
        for (const key in this.readCSVEncode) {
            if (this.readCSVEncode.hasOwnProperty(key)) {
                if (key === encode) {
                    this.readCSVEncode[key] = true;
                } else {
                    this.readCSVEncode[key] = false;
                }
            }
        }
    }
    /** ********************************************
     *
     * 画面毎の処理
     *
    ******************************************** */

    /**
     * タックシールのタイプを設定
     * @param id  タックシールタイプ
     */
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
    /**
     * タクシールの寸法を設定
     */
    setSheetSpec(): void {
        this.moveWindow('desine');
    }
    /**
     * タックシールに描画するデザインを設定
     * @param type デザイン番号
     */
    setSheetDesine(type: string): void {
        this.printSheetDesine = type;
        this.setupSheetDesine(type);
        this.moveWindow('position');

        // レビュー時に適用するクラスを設定
        this.setupSheetDesineClass();
    }
    /**
     * 印刷開始位置を設定
     */
    setPrintPosition(): void {
        this.moveWindow('loadcsv');
    }
    /**
     * CSVを取り込むか設定
     * @param choice 読み込みの可否
     */
    setLoadCSV(choice): void {
        if (choice) {
            this.moveWindow('includecsv');
        } else {
            this.moveWindow('input');
        }
    }
    /**
     * CSVファイルの取り込み
     */
    setIncludeCSV(): void {
        this.printCellCount = (this.readCSVFile.length <= this.printCellCount) ? this.readCSVFile.length : this.printCellCount;
        const contents_print = new Array(this.cellCounter.length);
        const contents_preview = new Array(this.cellCounter.length);
        let keyCount = 0;
        for (let i = 0; i < this.readCSVFile.length; i++) {
            const cp = {};
            const cprint = [];
            for (const key in this.inputForm) {
                if (this.formStatus.hasOwnProperty(key)
                && this.inputForm[key]
                && this.readCSVFile[i][keyCount] !== undefined
                && this.readCSVFile[i][keyCount] !== '') {
                    cp[key] = this.readCSVFile[i][keyCount];
                    cprint.push(this.readCSVFile[i][keyCount]);
                    keyCount++;
                } else  {
                    cp[key] = '';
                }
            }
            contents_preview[(i + this.printStartPosition)] = cp;
            contents_print[i] = cprint;
            keyCount = 0;
        }

        this.sheetContent = contents_print;
        this.sheetContentPreview = contents_preview;
        this.previewClass = 'sheet_' + this.printSheetDesine;
        this.moveWindow('reviewcsv');
        this.buildIMage();
    }
    /**
     * 表示内容を入力
     */
    setInputContents(): void {
        const contents_print = new Array(this.cellCounter.length);
        const contents_preview = new Array(this.cellCounter.length);
        for (let i = 0; i <= this.printCellCount; i++) {
            const cp = {};
            const cprint = [];
            for (const key in this.inputForm) {
                if (this.formStatus.hasOwnProperty(key)
                && this.inputForm[key]) {
                    cp[key] = this.formStatus[key];
                    cprint.push(this.formStatus[key]);
                } else  {
                    cp[key] = '';
                }
            }
            contents_preview[(i + this.printStartPosition)] = cp;
            contents_print[i] = cprint;
        }
        this.sheetContent = contents_print;
        this.sheetContentPreview = contents_preview;

        this.previewClass = 'sheet_' + this.printSheetDesine;
        this.moveWindow('reviewcsv');
        this.buildIMage();
    }
    /**
     * タックシールをレビュー
     */
    setReviewSheet(): void {
        this.moveWindow('download');
    }
    /**
     * PDFをダウンロード
     */
    setDownloadPDF(): void {

    }


    /** ******************************************
     * 数値計算、移動先計算他、補助ライブラリ
    ****************************************** */

    /**
     * タックシールの面数を計算
     */
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
    /**
     * 印刷開始位置設定
     * @param id 印刷開始位置
     */
    setPrintStartIndex(id: number): void {
        this.printStartPosition = id;
    }

    setupPrintData(): void {
        const contents = [];
        let printCount = 0;
        for (let i = 0; i <= this.cellCounter.length; i++) {
            if (this.printStartPosition <= i
                && this.printCellCount >= printCount) {
                for (const key in this.inputForm) {
                    if (this.inputForm.hasOwnProperty(key)) {
                        if (this.inputForm[key]) {
                            contents[key] = this.formStatus[key];
                        } else {
                            contents[key] = '';
                        }
                    }
                }
                printCount++;
            }
        }
    }

    /**
     * タックシールの寸法を決定
     * serviceに登録済みのデータを注入するのみで
     * カスタムされた値は自動的にバインディングされる
     * @param spec 各寸法
     */
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
    /**
     * シートデザインを決定
     * @param desine デザイン名
     */
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
    /**
     * プレビューに表示するクラスを登録
     */
    setupSheetDesineClass(): void {
        const calam = this.reviewStyle.length;
        this.reviewStyle.splice(1, calam);
        this.reviewStyle.push('sheet_' + this.printSheetDesine);
    }


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
            this.flags.onDragCSVFile = true;
        } else if (window === 'input') {
            this.flags.onInputContents = true;
        } else if (window === 'reviewcsv') {
            this.flags.onReviewCSV = true;
        } else if (window === 'download') {
            this.flags.onDownload = true;
        }
    }
    /**
     * 印刷開始位置判定
     * @param id 印刷開始位置
     */
    checkStartPosition(id): boolean {
        if (id >= this.printStartPosition
        && id < this.printStartPosition + this.printCellCount) {
            return true;
        }
        return false;
    }
    /**
     * 初期パラメーターの初期化
     */
    reset(type: string): void {
        if (type === 'last') {

        } else if (type === 'first') {
            this.reader = null;
        }
    }
    /**
     * タックシートイメージ画像作成
     */
    buildIMage(): void {
        this.tacksheetmakeService.initialization();

        this.tacksheetmakeService.setResulution(13.78095);
        this.tacksheetmakeService.setSheetSpec({
            marginTop: this.sheetStatus['pageMarginTop'],
            marginLeft: this.sheetStatus['pageMarginLeft'],
            cellWidth: this.sheetStatus['LabelWidth'],
            cellHeight: this.sheetStatus['LabelHeight'],
            cellMarginTop: this.sheetStatus['LabelMarginTop'],
            cellMarginLeft: this.sheetStatus['LabelMarginLeft'],
        });
        this.tacksheetmakeService.setTextDesine({
            fontSize: 10,
        });

        this.tacksheetmakeService.setPrintOption({
            cellCount: this.cellCounter.length,
            startPosition: this.printStartPosition,
            printCount: this.printCellCount
        });
        this.tacksheetmakeService.setContents(this.sheetContent);
        const layout = this.tacksheetlayoutService.getTextLayout(this.printSheetDesine);
        console.log(layout);
        this.tacksheetmakeService.setTextLayout(layout);
        this.tacksheetmakeService.sheetMaker();

        this.sheetPrintImage = this.tacksheetmakeService.getSheetImage();
        this.sheetPreviewImage = this.tacksheetmakeService.getPreviewImage();
    }

    /**
     * PDFファイル作成
     */
    buildPdf(): void {
        const layout = this.tacksheetlayoutService.makePdfLayout(this.sheetPrintImage);
        const pdf = this.pdfmakerService.testPdfMake(layout);
        pdf.print();
    }

}
