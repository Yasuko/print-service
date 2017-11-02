import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
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
    previewClass = '';
    previewScale = 0.1;
    cellCounter = [];
    reviewStyle = ['ghost-cell'];

    reader = new FileReader();

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
    onDropHandler(event: DragEvent): void {
        event.preventDefault();
        this.reset('fast');

        const files = event.dataTransfer.files;
        this.reader = new FileReader();

        // データタイプの判定
        if (!files[0] || files[0].type.indexOf('image/') < 0) {

        } else {
            this.reader.onloadend = (e) => {
                const result = [];
                const data = this.reader.result;
                const splitData = data[0].split('\n');
                for (let i = 0; i < splitData.length; i++) {
                    result[i] = splitData[i].split(',');
                }
                console.log(result);
            };
            this.reader.readAsDataURL(files[0]);
        }
        event.stopPropagation();
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
        this.moveWindow('reviewcsv');
    }
    /**
     * 表示内容を入力
     */
    setInputContents(): void {
        const contents = [];
        for (const key in this.formStatus) {
            if (this.formStatus.hasOwnProperty(key)
            && this.formStatus[key] !== '') {
                contents.push(this.formStatus[key]);
            }
        }
        for (let i = 0; i <= this.cellCounter.length; i++) {
            this.sheetContent[i] = contents;
        }

        this.previewClass = 'sheet_' + this.printSheetDesine;
        this.moveWindow('reviewcsv');
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

    setPrintStartIndex(id: number): void {
        this.printStartPosition = id;
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
        } else if (window === 'input') {
            this.flags.onInputContents = true;
        } else if (window === 'reviewcsv') {
            this.flags.onReviewCSV = true;
        } else if (window === 'download') {
            this.flags.onDownload = true;
        }
    }

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
     * PDFファイル作成
     */
    buildPdf(): void {
        // const result = 3.781;

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
        this.tacksheetmakeService.sheetMaker();
        const image = this.tacksheetmakeService.getSheetImage();

        const layout = this.tacksheetlayoutService.makePdfLayout(image);
        const pdf = this.pdfmakerService.testPdfMake(layout);
        pdf.print();
    }

}
