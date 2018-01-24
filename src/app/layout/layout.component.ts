import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LayoutStatusService } from './layout-status.service';
import { PrintDataService } from '../service/index';
import { PrintData, PrintText } from '../service/index';
import { SubjectsService } from '../service/index';

import { fadeInAnimation, alertAnimation } from '../_lib_service/index';
// Import Component Liblary
import { AlertComponent, LoadingComponent } from '../_lib_component/index';


@Component({
    selector: 'layout-edit',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.scss'],
    animations: [ fadeInAnimation, alertAnimation ],
})

export class LayoutComponent implements OnInit {

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
    editScale = 'scale(1)';
    editScaleCount = 1;

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

    editWidth = 0;
    editHeight = 0;

    pageMoveSwitch = false;
    pageMoveBasePointX = 0;
    pageMoveBasePointY = 0;
    pageMoveFinalPointX = 0;
    pageMoveFinalPointY = 0;
    pageMoveX = 0;
    pageMoveY = 0;

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
        private printDataService: PrintDataService,
        private subjectsService: SubjectsService,
    ) {
        this.flags = this.layoutStatusService.flags;
        this.sheetSpec = this.layoutStatusService.sheetSpec;
        this.sheetSize = this.layoutStatusService.sheetSize;
    }

    ngOnInit(): void {
        this.getALLPrintData();
        console.log('aaaaa');
    }
    /** ********************************************
    * SVGファイルドラッグイベント
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
        this.onDrag = false;
        // this.reset('fast');

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
                this.editLayout.template = String(this.reader.result);
            };
            this.reader.readAsDataURL(files[0]);
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
    * 画面移動
    ******************************************** */
    onPageDownHandler(event: MouseEvent): void {
        if (!this.moveSwitch) {
            this.pageMoveBasePointX = event.pageX;
            this.pageMoveBasePointY = event.pageY;
            this.pageMoveSwitch = true;
        }
    }

    onPageMoveHandler(event: MouseEvent): void {
        if (this.pageMoveSwitch) {
            this.pageMoveX =  -(this.pageMoveBasePointX - event.pageX) + this.pageMoveFinalPointX;
            this.pageMoveY = -(this.pageMoveBasePointY - event.pageY) + this.pageMoveFinalPointY;
        }
    }

    onPageUpHandler(event: MouseEvent): void {
        if (this.pageMoveSwitch) {
            this.pageMoveFinalPointX = this.pageMoveX;
            this.pageMoveFinalPointY = this.pageMoveY;
            this.pageMoveSwitch = false;
        }
    }
    /** ********************************************
    * テキストの移動
    ******************************************** */
    onTextDownHandler(event: MouseEvent, i: number): void {
        this.moveTarget = i;
        this.svgBox = document.getElementById('edit-svg');

        const rect = this.svgBox.getBoundingClientRect();
        const sc = this.editScaleCount;
        this.x = rect.left / sc + window.pageXOffset / sc;
        this.y = rect.top / sc + window.pageYOffset / sc;
        this.mouseStartingPointX = event.pageX / sc - this.x;
        this.mouseStartingPointY = event.pageY / sc - this.y;
        this.moveSwitch = true;
    }

    onTextMoveHandler(event: MouseEvent): void {
        const sc = this.editScaleCount;
        if (this.moveSwitch) {
            this.mouseMoveX = (this.mouseStartingPointX + this.x) - event.pageX / sc;
            this.mouseMoveY = (this.mouseStartingPointY + this.y) - event.pageY / sc;
            const x = Math.floor((this.mouseStartingPointX - this.mouseMoveX) * 1000);
            const y = Math.floor((this.mouseStartingPointY - this.mouseMoveY) * 1000);
            this.textLists[this.moveTarget]['x'] = x / 1000;
            this.textLists[this.moveTarget]['y'] = y / 1000;
        }
    }

    onTextUpHandler(event: MouseEvent): void {
        this.moveSwitch = false;
    }

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

    addNewText(): void {
        const txt = {
            id: 0 , text: 'ああああああああああ',
            size: 10, x: 20, y: 100, font: '',
            length: 50, create: 0, update: 0} as PrintText;
        this.textLists.push(txt);
    }
    addLayout(): Promise<PrintData> {
        const print = {
            title: this.editLayout.title,
            template: this.editLayout.template,
            size: this.editSheetSize,
            direction: this.editSheetDirection
        } as PrintData;

        return this.printDataService.setPrint(print)
            .then((response: PrintData) => response);
    }
    addText(id): void {
        this.printDataService.setTextMulti(this.textLists, id);
    }

    updateLayout(): Promise<PrintData> {
        const print = {
            id: Number(this.editLayout.id),
            title: this.editLayout.title,
            template: this.editLayout.template,
            size: this.editSheetSize,
            direction: this.editSheetDirection
        } as PrintData;
        return this.printDataService.updatePrint(print);
    }

    updateText(id: number): void {
        this.printDataService.updateText(this.textLists, id)
            .then((response: PrintText[]) => {
                // this.textLists = response;
            });
    }

    deleteText(id: number): Promise<any> {
        return this.printDataService.deleteText(id)
            .then((response: PrintText[]) => {
                this.textLists = response;
            });
    }

    /** ********************************************
         *
         * 画面毎の処理
         *
    ******************************************** */

    setNewLayout(): void {
        this.moveWindow('loadsvg');
    }

    setLoadSVG(): void {
        this.moveWindow('edit');
    }
    setEdit(id: number): void {
        this.getPrintData(id);

    }
    setSave(): void {

        this.subjectsService.publish('load', 'show');

        if (this.editLayout.id !== undefined) {
            this.updateLayout()
                .then((response) => {
                    this.updateText(response.id);
                    this.subjectsService.publish('load', 'hide');
                    this.subjectsService.publish('alert', '保存完了');
                });
        } else {
            this.addLayout().then((response: PrintData) => {
                this.addText(response['id']);
                this.subjectsService.publish('load', 'hide');
                this.subjectsService.publish('alert', '登録完了');
            });
        }
        this.getALLPrintData();
        // this.moveWindow('main');
    }
    setDelete(id: number): void {
        this.subjectsService.publish('load', 'show');
        this.deleteText(id)
            .then(() => {
                this.subjectsService.publish('load', 'hide');
                this.subjectsService.publish('alert', '削除完了');
            }

            );
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
            this.flags.main = true;
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
        this.editWidth = this.sheetWidth * this.editResolution;
        this.editHeight = this.sheetHeight * this.editResolution;
    }
    setupSheetDirection(rotate: string): void {
        this.editSheetDirection = rotate;
        this.sheetSpec['vertical'] = (rotate === 'vertical') ? true : false;
        this.sheetSpec['side'] = (rotate === 'side') ? true : false;
        this.setupSheetType(this.editSheetSize);
    }
    setupBig(): void {
        this.editScaleCount += 0.1;
        this.editScale = 'scale(' + this.editScaleCount + ')';
    }
    setupLittle(): void {
        this.editScaleCount -= 0.1;
        this.editScale = 'scale(' + this.editScaleCount + ')';
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


}
