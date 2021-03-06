import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
// Import TherdParty Service
import { PdfMakerService, RecruiteMakerService } from '../_lib_service/index';
// import { ListLayoutService, RecruiteLayoutService } from '../_lib_service/index';
import { ImageMakerService, ImageOrientationService } from '../_lib_service/index';

// Import Layout
import { RecruiteLayoutType1Service, RecruiteLayoutType2Service } from '../_lib_service/index';
import { RecruiteLayoutType3Service, RecruiteLayoutType4Service } from '../_lib_service/index';
import { RecruiteLayoutType5Service } from '../_lib_service/index';

@Component({
    selector: 'recruite-print',
    templateUrl: './recruite.component.html',
    styleUrls: ['./recruite.scss']
})

export class RecuruiteComponent {

    reader;
    catOn = false;
    pdfOn = false;
    flags = {
        onFileLoad: false,
            onPicuture: true,
            onReview: false,
            onFaceCat: false,
        onDrag: false,
        onType: false,
        onSelectPhoto: true,
        onDownload: false,
        onLoad: false
    };
    pageLayout = [];

    fname = '';
    name = '';

    onImage = '';
    onImageType;
    moveSwitch = false;
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

    x = 0;
    y = 0;
    width = 200;
    height = 300;

    editTarget = 0;
    editTargetWidth = 0;
    editTargetHeight = 0;
    editName = '';
    canvasBase: HTMLCanvasElement;
    canvasImage: HTMLImageElement;
    canvasWidth;
    canvasHeight;
    canvasRatio;

    catW = 0;
    catH = 0;
    catA = 0;

    subscription: Subscription;
    constructor(
        private router: Router,
        private sanitizer: DomSanitizer,
        private pdfmakerService: PdfMakerService,
        // private listlayoutService: ListLayoutService,
        // private recruitelayoutService: RecruiteLayoutService,
        private imageOrientationService: ImageOrientationService,
        private imageMakerService: ImageMakerService,
        private recruiteMakerService: RecruiteMakerService,
        private recruiteLayout1: RecruiteLayoutType1Service,
        private recruiteLayout2: RecruiteLayoutType2Service,
        private recruiteLayout3: RecruiteLayoutType3Service,
        private recruiteLayout4: RecruiteLayoutType4Service,
        private recruiteLayout5: RecruiteLayoutType5Service,
    ) {
        this.pageLayout[0] = this.recruiteLayout5.getLayoutPage1();
        this.pageLayout[1] = this.recruiteLayout5.getLayoutPage2();
    }

    onDragOverHandler(event: DragEvent): void {
        event.preventDefault();
        this.flags.onDrag = true;
    }
    onDragLeaveHandler(event: DragEvent): void {
        event.stopPropagation();
        this.flags.onDrag = false;
    }

    /**
     * 読み込んだファイルの表示
     * @param event ドラッグされたファイル
     */
    onSelectHandler(event, type): void {
        event.preventDefault();
        this.flags.onPicuture = false;
        this.flags.onReview = true;
        this.flags.onDrag = false;
        this.reset('fast');
        if (this.canvasImage) {
            // イベントが残っている場合イベントも初期化
            this.reset('last');
        }
        let files;
        if (type === 'drag') {
            files = event.dataTransfer.files;
        } else if (type === 'select') {
            files = event.target.files;
        }

        // データタイプの判定
        if (!files[0] || files[0].type.indexOf('image/') < 0) {
        } else {
            this.reader = new FileReader();
            this.reader.onloadend = (e) => {
                this.getFileType(e.target.result);
                this.onImage = e.target.result;
                const orientation = this.imageOrientationService.getOrientation(this.onImage);
                console.log(orientation);
                if (orientation === 0 || orientation === 1) {
                    this.resultImage();
                } else {
                    this.rotationImage(orientation);
                }
                event.stopPropagation();
            };
            this.reader.readAsDataURL(files[0]);
        }
    }
    /**
     * 読み込まれた画像の表示
     * @param event マウスイベント
     */
    resultImage(): void {
        // canvas要素の取得doctypeを指定しないとエラーになるので注意
        this.canvasBase = <HTMLCanvasElement> document.getElementById('face-shot');
        const ctx = this.canvasBase.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        /**
         * 画像追加処理
         */
        this.canvasImage = new Image();
        this.canvasImage.onload = (e) => {
            this.canvasWidth = 300;
            this.canvasRatio = this.canvasWidth / this.canvasImage.naturalWidth;
            this.canvasHeight = this.canvasImage.naturalHeight * this.canvasRatio;
            this.canvasBase.setAttribute('width', this.canvasWidth.toString());
            this.canvasBase.setAttribute('height', this.canvasHeight.toString());
            ctx.drawImage(this.canvasImage, 0, 0, this.canvasWidth, this.canvasHeight);
            this.setMouseEvent();
        };
        this.canvasImage.src = this.onImage;
    }
    rotationImage(rotate): void {

        this.imageOrientationService
            .ImgRotation(this.onImage, rotate)
            .then((img) => {
                this.onImage = img;
                this.resultImage();
            });

    }

    /**
     * リサイズ領域表示イベント登録
     *
     */
    setMouseEvent(): void {
        this.canvasBase.addEventListener('mousedown', (e) => {
            this.editStart(e);
        }, false);
        this.canvasBase.addEventListener('mouseup', (e) => {
            this.editEnd(e);
        }, false);
        this.canvasBase.addEventListener('mousemove', (e) => {
            if (this.moveSwitch) {
                this.editAreaView(e);
            }
        }, false);
        this.canvasBase.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.editStart(e);
        });
        this.canvasBase.addEventListener('touchend', (e) => {
            e.stopPropagation();
            this.editEnd(e);
        });
        this.canvasBase.addEventListener('touchmove', (e) => {
            if (this.moveSwitch) {
                this.editAreaView(e);
            }
        });
    }
    editStart(e): void {
        const rect = this.canvasBase.getBoundingClientRect();
        this.x = rect.left;
        this.y = rect.top;
        this.mouseStartingPointX = e.pageX - rect.left;
        this.mouseStartingPointY = e.pageY - rect.top;
        this.moveSwitch = true;
        this.catOn = true;
    }
    editEnd(e): void {
        console.log(this.mouseStartingPointX + ':' + this.mouseStartingPointY + ':' + this.mouseMoveX + ':' + this.mouseMoveY);
        this.moveSwitch = false;
        this.flags.onFaceCat = true;
    }
    editAreaView(e): void {
        const ctx = this.canvasBase.getContext('2d');
        ctx.clearRect( 0, 0, this.canvasWidth, this.canvasHeight);
        this.mouseMoveX = -((this.mouseStartingPointX + this.x) - e.pageX);
        this.mouseMoveY = -(this.mouseMoveX / 0.75);
        this.mouseMoveX = (this.mouseMoveX < 0) ? -(this.mouseMoveX) : this.mouseMoveX;
        this.mouseMoveY = (this.mouseMoveY < 0) ? -(this.mouseMoveY) : this.mouseMoveY;
        this.catW = this.mouseMoveX;
        this.catH = this.mouseMoveY;
        ctx.drawImage(this.canvasImage, 0, 0, this.canvasWidth, this.canvasHeight);
        ctx.fillRect(this.mouseStartingPointX, this.mouseStartingPointY, this.mouseMoveX, this.mouseMoveY);
        ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
    }

    /**
     * 画像のトリミング
     * リサイズ処理を行っているので
     * 切り取り位置の指定は縮小率を考慮する必要あり
     */
    catImage(): void {
        const oc = <HTMLCanvasElement> document.createElement('canvas');
        const octx = oc.getContext('2d');

        const img = new Image();

        img.onload = (e) => {
            oc.setAttribute('width', (this.catW / this.canvasRatio).toString());
            oc.setAttribute('height', (this.catH / this.canvasRatio).toString());
            octx.drawImage(
                img, // 切り取りイメージ
                (this.mouseStartingPointX / this.canvasRatio), // 切り取り開始X座標
                (this.mouseStartingPointY / this.canvasRatio), // 切り取り開始Y座標
                this.catW / this.canvasRatio, // 切り取り幅
                this.catH / this.canvasRatio, // 切り取り高さ
                0, 0,
                this.catW / this.canvasRatio,
                this.catH / this.canvasRatio); // 切り取り後の表示位置とサイズ

            // 切り取り後のイメージを保存
            this.onImage = oc.toDataURL(this.onImageType);
            this.catOn = false;
            this.reset('last');

            this.resultImage();
        };
        img.src = this.onImage;
    }

/******************************************************
 * ページ毎の処理
 *
 *****************************************************/

    setPicutureType(choice: boolean): void {
        if (choice) {
            this.moveWindow('edit');
        } else {
            this.moveWindow('download');
        }

    }
    setPicutureEdit(choice: boolean): void {
        this.moveWindow('edit');

    }
    setReview(): void {
        if (!this.pageLayout.hasOwnProperty(0)) {
            this.setLayout(0);
        }
        this.moveWindow('download');
    }
    setDownload(): void {
        this.buildIMage();
    }

    moveWindow(window: string): void {
        for (const key in this.flags) {
            if (this.flags.hasOwnProperty(key)) {
                this.flags[key] = false;
            }
        }
        if (window === 'type') {
            this.flags.onType = true;
            this.flags.onPicuture = true;
        } else if (window === 'picture') {
            this.flags.onSelectPhoto = true;
        } else if (window === 'edit') {
            this.flags.onFileLoad = true;
            this.flags.onPicuture = true;
        } else if (window === 'download') {
            this.flags.onDownload = true;
        }
    }
    /**
     * マウスイベント削除
     * angularに依存せずにイベントを管理しているので必ず
     * イベントを毎回破棄すること
     */
    removeMouseEvent(): void {
        this.canvasBase.removeEventListener('mousedown', (e) => {});
        this.canvasBase.removeEventListener('mouseup',   (e) => {});
        this.canvasBase.removeEventListener('mousemove', (e) => {});
    }
    reset(type: string): void {
        if (type === 'last') {
            this.removeMouseEvent();
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
    setupLayoutType(type: number): void {
        this.pageLayout = this.setLayout(type);
    }

    setLayout(type: number): string[] {
        if (type === 1) {
            return [
                this.recruiteLayout1.getLayoutPage1(),
                this.recruiteLayout1.getLayoutPage2()
            ];
        } else if (type === 2) {
            return [
                this.recruiteLayout1.getLayoutPage1(),
                this.recruiteLayout2.getLayoutPage2()
            ];
        } else if (type === 3) {
            return [
                this.recruiteLayout1.getLayoutPage1(),
                this.recruiteLayout3.getLayoutPage2()
            ];
        } else if (type === 4) {
            return [
                this.recruiteLayout1.getLayoutPage1(),
                this.recruiteLayout4.getLayoutPage2()
            ];
        } else if (type === 0) {
            return [
                this.recruiteLayout5.getLayoutPage1(),
                this.recruiteLayout5.getLayoutPage2()
            ];
        }
    }
    buildIMage(): void {
        this.imageMakerService.setResulution(13.78095);
        this.imageMakerService.setSheetSize(210, 297);
        this.imageMakerService.setSheetBackground(this.pageLayout[0]);
        this.imageMakerService.overFaceShot(this.onImage).then(
            (img1) => {
                const image0 = img1;
                this.imageMakerService.setSheetBackground(this.pageLayout[1]);
                this.imageMakerService.svgToImg().then(
                    (img2) => {
                        this.pageLayout = [image0, img2];
                        this.buildPdf();
                    }
                );
            }
        );
    }
    buildPdf(): void {
        this.recruiteMakerService.setResolution(2.8333);
        this.recruiteMakerService.setLayout(this.pageLayout);

        const layout = this.recruiteMakerService.makeRecruiteLayout();
        const userAgent = window.navigator.userAgent.toLowerCase();
        this.pdfmakerService.pdfMakeForIE(layout);

    }
    getFileType(file): void {
        const header = file.split(';');
        const type = header[0].split(':');
        this.onImageType = type[1];
    }
}
