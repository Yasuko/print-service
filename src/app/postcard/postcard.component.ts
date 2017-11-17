import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
// Import TherdParty Service
import { PdfMakerService } from '../_lib_service/index';
import { ListLayoutService, RecruiteLayoutService } from '../_lib_service/index';
import { PostcardStatusService } from './postcard-status.service';
import { PostcardService } from '../service/sheetDesine/index';

@Component({
    selector: 'postcard-print',
    templateUrl: './postcard.component.html',
    styleUrls: ['./postcard.scss']
})

export class PostcardComponent {

    flags;
    formStatus;
    inputForm;
    desineFlagsAddress;
    desineFlagsCompany;
    desineFlagsName;

    previewClass = '';
    previewScale = 0.1;
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
        private postcardStatusService: PostcardStatusService,
        private postcardService: PostcardService
    ) {
        this.flags = postcardStatusService.flags;
        this.formStatus = postcardStatusService.formStatus;
        this.inputForm = postcardStatusService.inputForm;
        this.desineFlagsAddress = postcardStatusService.desineFlagsAddress;
        this.desineFlagsCompany = postcardStatusService.desineFlagsCompany;
        this.desineFlagsName = postcardStatusService.desineFlagsName;
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

    setSheetType(type: number): void {
        this.moveWindow('desine');
    }
    setSheetDesine(desine: string): void {
        this.moveWindow('title');
    }
    setNameTitle(id: number): void {
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
                keyCount = 0;
        }
        this.moveWindow('reviewcsv');
        this.buildIMage();
    }
    /**
    * 表示内容を入力
    */
    setInputContents(): void {

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
        } else if (window === 'desine') {
            this.flags.onSheetDesine = true;
        } else if (window === 'title') {
            this.flags.onNameTitle = true;
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
     * シートデザインを決定
     * @param desine デザイン名
     */
    setupSheetDesine(desine: string): void {
        const data = this.postcardService.getLabelSheetDesine(desine);
        let count = 0;
        for (const key in this.inputForm) {
            if (this.inputForm.hasOwnProperty(key)) {
                this.inputForm[key] = data['input'][count];
                count++;
            }
        }
    }

    setupAddressDesine(address: string): void {
        for (const key in this.desineFlagsAddress) {
            if (this.desineFlagsAddress.hasOwnProperty(key)) {
                if (key === address) {
                    if (this.desineFlagsAddress[key]) {
                        this.desineFlagsAddress[key] = false;
                    } else {
                        this.desineFlagsAddress[key] = true;
                    }

                } else {
                    this.desineFlagsAddress[key] = false;
                }
            }
        }
    }
    setupCompanyDesine(company: string): void {
        for (const key in this.desineFlagsCompany) {
            if (this.desineFlagsCompany.hasOwnProperty(key)) {
                if (key === company) {
                    if (this.desineFlagsCompany[key]) {
                        this.desineFlagsCompany[key] = false;
                    } else {
                        this.desineFlagsCompany[key] = true;
                    }
                } else {
                    this.desineFlagsCompany[key] = false;
                }
            }
        }
    }
    setupNameDesine(name: string): void {
        for (const key in this.desineFlagsName) {
            if (this.desineFlagsName.hasOwnProperty(key)) {
                if (key === name) {
                    if (this.desineFlagsName[key]) {
                        this.desineFlagsName[key] = false;
                    } else {
                        this.desineFlagsName[key] = true;
                        this.inputForm.name2 = true;
                    }
                } else {
                    this.desineFlagsName[key] = false;
                }
            }
        }
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
    }

    /**
    * PDFファイル作成
    */
    buildPdf(): void {

    }
}
