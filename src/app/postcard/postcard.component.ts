import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
// Import TherdParty Service
import { PdfMakerService } from '../_lib_service/index';
import { ListLayoutService, RecruiteLayoutService } from '../_lib_service/index';
import { PostcardMakerService, TacksheetLayoutService } from '../_lib_service/index';
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
    multiPageFlag = false;

    postcardType = 'normal';
    postcardDesine = null;
    postcardMyAddress = false;

    postcardPreviewImage;
    postcardImage;

    postcardPreviewImageMulti = [];
    postcardImageMulti = [];

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
        private postcardMakerService: PostcardMakerService,
        private tacksheetLayoutService: TacksheetLayoutService
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

    setSheetType(type: string): void {
        this.postcardType = type;
        this.multiPageFlag = false;
        this.moveWindow('loadcsv');
    }

    /**
    * CSVを取り込むか設定
    * @param choice 読み込みの可否
    */
    setLoadCSV(choice): void {
        if (choice) {
            this.multiPageFlag = true;
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
        this.buildIMageMulti();
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
        if (this.multiPageFlag) {
            this.buildPdfMulti();
        } else {
            this.buildPdf();
        }
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
        } else {
            this.postcardDesine = 'address';
        }
        if (this.formStatus.myName !== '') {
            this.postcardMyAddress = true;
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


    checkNull(cell): boolean {
        return (cell !== '') ? true : false;
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
     * 画像作成
     */
    buildIMage(): void {
        this.postcardMakerService.setResulution(13.78095);
        this.postcardMakerService.setAddressLayout(
            this.postcardService.getPostcardDesine(this.postcardDesine)
        );
        if (this.postcardMyAddress) {
            let desine = [];

            if (this.postcardType === 'normal') {
                desine = this.postcardService.getPostcardDesine('myAddress');
            } else {
                desine = this.postcardService.getPostcardDesine('myAddressNewYear');
            }

            this.postcardMakerService.setMyAddressLayout(desine);
        }
        this.postcardMakerService.setPrintContents(this.formStatus);
        this.postcardMakerService.sheetMaker().then(
            (img) => {
                this.postcardPreviewImage = img;
                this.postcardImage = this.postcardMakerService.getSheetImage();
            }
        );

    }

    buildIMageMulti(): void {
        const pages = this.readCSVFile.length - 1;
        let page = 0;
        let column = 0;

        const AddPage = () => {
            column = 0;
            this.postcardMakerService.initialization();

            for (const key in this.formStatus) {
                if (this.formStatus.hasOwnProperty(key)) {
                    this.formStatus[key] = this.readCSVFile[page][column];
                    column++;
                }
            }
            this.setupPostcardDesine();
            this.postcardMakerService.setResulution(13.78095);
            this.postcardMakerService.setAddressLayout(
                this.postcardService.getPostcardDesine(this.postcardDesine)
            );
            if (this.postcardMyAddress) {
                let desine = [];
                console.log(this.postcardType);
                if (this.postcardType === 'normal') {
                    desine = this.postcardService.getPostcardDesine('myAddress');
                } else {
                    desine = this.postcardService.getPostcardDesine('myAddressNewYear');
                }
                this.postcardMakerService.setMyAddressLayout(desine);
            }
            this.postcardMakerService.setPrintContents(this.formStatus);
            this.postcardMakerService.setSheetType(this.postcardType);
            this.postcardMakerService.sheetMaker().then(
                (img) => {
                    this.postcardPreviewImageMulti.push(img);
                    this.postcardImageMulti.push(this.postcardMakerService.getSheetImage());
                    // console.log(page + '::' + pages);
                    if (page === pages) {
                        // this.buildIMageMulti();
                    } else {
                        page++;
                        AddPage();
                    }
                }
            );
        };

        AddPage();

    }

    /**
    * PDFファイル作成
    */
    buildPdf(): void {
        const layout = this.tacksheetLayoutService.makePdfLayout(this.postcardImage);
        const pdf = this.pdfmakerService.testPdfMake(layout);
        pdf.print();
    }
    buildPdfMulti(): void {
        const layout = this.tacksheetLayoutService.makePdfLayoutMulti(this.postcardImageMulti);
        const pdf = this.pdfmakerService.testPdfMake(layout);
        pdf.print();
    }
}
