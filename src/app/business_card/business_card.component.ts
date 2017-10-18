import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
// Import TherdParty Service
import { PdfMakerService } from '../_lib_service/index';
import { ListLayoutService, RecruiteLayoutService } from '../_lib_service/index';


@Component({
    selector: 'business_card-print',
    templateUrl: './business_card.component.html',
    styleUrls: ['./business_card.scss']
})

export class BusinessCardComponent {

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
                this.resultImage(e);
            };
            this.reader.readAsDataURL(files[0]);
        }
        event.stopPropagation();
    }

    /**
     * 読み込まれた画像の表示
     * @param event マウスイベント
     */
    resultImage(event): void {
        this.onImage = event.target.result;

        // canvas要素の取得doctypeを指定しないとエラーになるので注意
        this.canvasBase = <HTMLCanvasElement> document.getElementById('canvas');
        const ctx = this.canvasBase.getContext('2d');
        ctx.imageSmoothingEnabled = true;

        // いきなり画像を縮小するとブロックノイズが発生する対策用
        // 非表示で画像要素を作成し段階的に縮小させる
        // 無くても良い
        const oc = <HTMLCanvasElement> document.createElement('canvas');
        const octx = oc.getContext('2d');
        /**
         * 画像追加処理
         */
        this.canvasImage = new Image();
        this.canvasImage.onload = (e) => {
            const ctxw = this.canvasImage.naturalWidth * 0.5;
            const ctxh = this.canvasImage.naturalHeight * 0.5;
            octx.drawImage(this.canvasImage, 0, 0, ctxw, ctxh);
            if ( ctxw >= 600 ) {
                octx.drawImage(this.canvasImage, 0, 0, ctxw * 0.5, ctxh * 0.5);
            }

            this.canvasWidth = 300;
            this.canvasRatio = this.canvasWidth / this.canvasImage.naturalWidth;
            this.canvasHeight = this.canvasImage.naturalHeight * this.canvasRatio;
            this.canvasBase.setAttribute('width', this.canvasWidth.toString());
            this.canvasBase.setAttribute('height', this.canvasHeight.toString());
            ctx.drawImage(this.canvasImage, 0, 0, this.canvasWidth, this.canvasHeight);


            this.setMouseEvent();
        };
        this.canvasImage.setAttribute('class', 'org-image');
        this.canvasImage.src = this.onImage;
    }


    /**
     * マウスイベント登録
     *
     */
    setMouseEvent(): void {
        this.canvasBase.addEventListener('mousedown', (e) => {
            this.mouseMoveCheckX = e.offsetX;
            this.mouseMoveCheckY = e.offsetY;
            this.moveSwitch = true;
        }, false);
        this.canvasBase.addEventListener('mouseup', (e) => {
            console.log(this.mouseMoveCheckX + ':' + this.mouseMoveCheckY + ':' + this.mouseMoveX + ':' + this.mouseMoveY);
            this.catOn = true;
            this.moveSwitch = false;
        }, false);
        this.canvasBase.addEventListener('mousemove', (e) => {
            if (this.moveSwitch) {
                const ctx = this.canvasBase.getContext('2d');
                ctx.clearRect( 0, 0, this.canvasWidth, this.canvasHeight);
                this.mouseMoveX = -(this.mouseMoveCheckX - e.offsetX);
                this.mouseMoveY = -(this.mouseMoveCheckY - e.offsetY);
                ctx.drawImage(this.canvasImage, 0, 0, this.canvasWidth, this.canvasHeight);
                ctx.fillRect(this.mouseMoveCheckX, this.mouseMoveCheckY, this.mouseMoveX, this.mouseMoveY);
                ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
            }
        }, false);
    }

    /**
     * 画像のトリミング
     * リサイズ処理を行っているので
     * 切り取り位置の指定は縮小率を考慮する必要あり
     */
    catImage(): void {
        console.log(this.mouseMoveCheckX + ':' + this.mouseMoveCheckY + ':' + this.mouseMoveX + ':' + this.mouseMoveY);
        const ctx = this.canvasBase.getContext('2d');
        ctx.clearRect( 0, 0, this.canvasWidth, this.canvasHeight);

        this.canvasBase.setAttribute('width', this.mouseMoveX.toString());
        this.canvasBase.setAttribute('height', this.mouseMoveY.toString());
        ctx.drawImage(
            this.canvasImage, // 切り取りイメージ
            (this.mouseMoveCheckX / this.canvasRatio),
            (this.mouseMoveCheckY / this.canvasRatio),
            this.mouseMoveX / this.canvasRatio,
            this.mouseMoveY / this.canvasRatio, // 切り取り位置
            0, 0, this.mouseMoveX, this.mouseMoveY); // 切り取り後の表示位置とサイズ

        this.catOn = false;
        this.pdfOn = true;
        this.reset('last');
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

    buildPdf(): void {
        this.recruitelayoutService.setImage(this.canvasBase.toDataURL('image/png'));
        this.recruitelayoutService.setFName(this.fname);
        this.recruitelayoutService.setName(this.name);
        const layout = this.recruitelayoutService.makePdfLayout();
        const pdf = this.pdfmakerService.testPdfMake(layout);
        pdf.print();
    }

}
