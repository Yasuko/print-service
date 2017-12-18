import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LayoutStatusService } from './layout-status.service';
// Import TherdParty Service


@Component({
    selector: 'layout-edit',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.scss']
})

export class LayoutComponent {

    flags;
    sheetSpec;
    sheetSize;
    formStatus;
    inputForm;
    nameTitles;

    fname = '';
    name = '';
    onDrag = false;
    reader;

    loadSVGData;
    direction;

    textLists = [];

    sheetWidth = 0;
    sheetHeight = 0;

    editWidth = 0;
    editHeight = 0;


    svgBox;
    x = 0;
    y = 0;
    moveSwitch = false;
    moveTarget = 0;
    mouseStartingPointX = 0;
    mouseStartingPointY = 0;
    mouseMoveCheckX = 0;
    mouseMoveCheckY = 0;
    mouseMoveBaseX = 0;
    mouseMoveBaseY = 0;
    mouseMoveX = 0;
    mouseMoveY = 0;

    transformSwitch = false;
    mouseTranseW = 0;
    mouseTranseH = 0;

    subscription: Subscription;
    constructor(
        private router: Router,
        private sanitizer: DomSanitizer,
        private layoutStatusService: LayoutStatusService,
    ) {
        this.flags = this.layoutStatusService.flags;
        this.sheetSpec = this.layoutStatusService.sheetSpec;
        this.sheetSize = this.layoutStatusService.sheetSize;
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
        if (files[0].type === 'image/svg+xml') {
            const result = [];
            this.reader.onloadend = (e) => {
                const body = this.sanitizer.bypassSecurityTrustResourceUrl(this.reader.result);
                this.loadSVGData = body;
                console.log();
                // const svg = this.reader.result;
                // const parser = new DOMParser();
                // const dom = parser.parseFromString(svg, 'image/svg+xml');
                // const layer = dom.querySelector('g');
                // console.log(layer);
                // this.loadSVGData = layer.children;
                // console.log(this.loadSVGData[0]);
            };
            this.reader.readAsDataURL(files[0]);
            // this.reader.readAsText(files[0]);

            this.switchLoadtoPreview();
        }
        event.stopPropagation();
    }
    switchLoadtoPreview(): void {
        if (this.flags.onPreviewSVGFile) {
            this.flags.onPreviewSVGFile = false;
            this.flags.onDragSVGFile = true;
        } else {
            this.flags.onPreviewSVGFile = true;
            this.flags.onDragSVGFile = false;
        }

    }
    /** ********************************************
    * テキストの移動
    ******************************************** */
    onTextDownHandler(event: MouseEvent, i: number): void {
        this.moveTarget = i;
        this.svgBox = document.getElementById('edit-svg');

        const rect = this.svgBox.getBoundingClientRect();
        this.x = rect.left + window.pageXOffset;
        this.y = rect.top + window.pageYOffset;
        this.mouseStartingPointX = event.pageX - this.x;
        this.mouseStartingPointY = event.pageY - this.y;
        this.moveSwitch = true;
    }

    onTextMoveHandler(event: MouseEvent): void {
        if (this.moveSwitch) {
            console.log(this.mouseStartingPointX + '::' + this.mouseStartingPointY);
            console.log(this.x + '::' + this.y);
            console.log(event.pageX + '::' + event.pageY);
            this.mouseMoveX = (this.mouseStartingPointX + this.x) - event.pageX;
            this.mouseMoveY = (this.mouseStartingPointY + this.y) - event.pageY;
            console.log(this.mouseMoveX + '::' + this.mouseMoveY);
            this.textLists[this.moveTarget][3] = this.mouseStartingPointX - this.mouseMoveX;
            this.textLists[this.moveTarget][4] = this.mouseStartingPointY - this.mouseMoveY;
            console.log(this.mouseMoveX + '::' + this.mouseMoveY);
        }
    }

    onTextUpHandler(event: MouseEvent): void {
        this.moveSwitch = false;
    }

    onEditTextHandler(): void {

    }

    addNewText(): void {
        const txt = ['ああああああああああ', 10, 20, 100, 200];
        this.textLists.push(txt);
    }

    /** ********************************************
         *
         * 画面毎の処理
         *
    ******************************************** */

    setNewLayout(): void {
        this.moveWindow('sheetsize');
    }
    setSheetSize(type: string): void {
        this.setupSheetType(type);
        this.moveWindow('loadsvg');
    }

    setLoadSVG(): void {
        this.moveWindow('edit');
    }
    setEdit(): void {
        this.moveWindow('review');
    }

    setReview(): void {
        this.moveWindow('save');
    }

    setSave(): void {

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
        if (window === 'main') {
            this.flags.mian = true;
        } else if (window === 'sheetsize') {
            this.flags.onSheetSize = true;
        } else if (window === 'loadsvg') {
            this.flags.onLoadSVG = true;
            this.flags.onDragSVGFile = true;
            this.flags.onPreviewSVGFile = false;
        } else if (window === 'edit') {
            this.flags.onEdit = true;
        } else if (window === 'review') {
            this.flags.onReview = true;
        } else if (window === 'save') {
            this.flags.onSave = true;
        } else if (window === 'download') {
            this.flags.onDownload = true;
        }
    }

    setupSheetType(desine): void {

        for (const key in this.sheetSpec) {
            if (this.sheetSpec.hasOwnProperty(key)) {
                if (key !== 'vertical' && key !== 'side') {
                    if (desine === key) {
                        this.sheetSpec[key] = true;
                        const sheet = this.sheetSize[key];
                        if (this.sheetSpec['vertical'] === true) {
                            this.sheetWidth = sheet[0];
                            this.sheetHeight = sheet[1];
                        } else {
                            this.sheetWidth = sheet[1];
                            this.sheetHeight = sheet[0];
                        }
                    } else {
                            this.sheetSpec[key] = false;
                    }
                }
            }
        }
        this.editWidth = this.sheetWidth * 3;
        this.editHeight = this.sheetHeight * 3;
    }
    setupSheetDirection(rotate: string): void {
        this.sheetSpec['vertical'] = (rotate === 'vertical') ? true : false;
        this.sheetSpec['side'] = (rotate === 'side') ? true : false;
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


}
