import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
// Import TherdParty Service
import { PdfMakerService } from '../_lib_service/index';
import { ListLayoutService, RecruiteLayoutService } from '../_lib_service/index';
import { PostcardMakerService } from '../_lib_service/index';
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
    nameTitles;
    desineFlagsAddress;
    desineFlagsCompany;
    desineFlagsName;

    postcardDesine = null;
    postcarMyAddress = false;

    postcardPreviewImage;
    postcardImage;

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
        private postcardService: PostcardService,
        private postcardMakerService: PostcardMakerService
    ) {
        this.flags = postcardStatusService.flags;
        this.formStatus = postcardStatusService.formStatus;
        this.inputForm = postcardStatusService.inputForm;
        this.nameTitles = postcardStatusService.nameTitles;
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
        this.setupPostcardDesine();
        this.buildIMage();

        this.moveWindow('reviewcsv');
    }
    /**
    * はがきをレビュー
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


    setupInputDesine(desine: string): void {
        for (const key in this.inputForm) {
            if (this.inputForm.hasOwnProperty(key)) {
                if (key === desine) {
                    this.inputForm[key] = (this.inputForm[key]) ? false : true;
                }
            }
        }
    }

    /**
     * シートデザインを決定
     * @param desine デザイン名
     */
    setupPostcardDesine(): void {
        if (this.formStatus.company !== '') {
            this.postcardDesine = 'company';
        } else if (this.formStatus.name2 !== '') {
            this.postcardDesine = 'twise';
        }
        if (this.formStatus.myName !== '') {
            this.postcarMyAddress = true;
        }
        if (this.formStatus.title === '') {
            this.formStatus.title = '様';
        }
    }

    setupTitle(title): void {
        for (const key in this.nameTitles) {
            if (this.nameTitles.hasOwnProperty(key)) {
                console.log(this.nameTitles[key][1]);
                if (title === key) {
                    if (this.nameTitles[key][1]) {
                        this.nameTitles[key][1] = false;
                    } else {
                        this.nameTitles[key][1] = true;
                        this.formStatus.title = this.nameTitles[key][0];
                    }
                } else {
                    this.nameTitles[key][1] = false;
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
        this.postcardMakerService.setAddressLayout(this.postcardDesine);
        if (this.postcarMyAddress) {
            const desine = this.postcardService.getPostcardDesine('myAddress');
            this.postcardMakerService.setMyAddressLayout(desine);
        }
        this.postcardMakerService.setPrintContents(this.formStatus);
        this.postcardMakerService.sheetMaker();
        this.postcardPreviewImage = this.postcardMakerService.getPreviewImage();
        console.log(this.postcardPreviewImage);
    }

    /**
    * PDFファイル作成
    */
    buildPdf(): void {

    }
}
