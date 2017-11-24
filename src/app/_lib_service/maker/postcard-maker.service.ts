import { Injectable } from '@angular/core';

@Injectable()
export class PostcardMakerService {

    /**
     * 印刷サイズ
     * はがきを350dpiで出力する場合
     * 横1378px、縦2040px必要
     * 倍率は13.78095倍
     */
    private sheetSize = {
        width: 200,
        height: 296
    };
    /**
     * ラベルに関するサイズ、余白情報
     */
    private sheetSpec = {
        marginTop: 0,       // ページ余白上
        marginLeft: 0,      // ページ余白左
    };
    /**
     * 文字デザイン
     */
    private textDesine = {
        fontDesine: 'MS PMincho',
        fontWeight: 'normal',
    };
    /**
     * 印刷オプション
     */
    private printOption = {
    };

    private addressLayout;
    private myAddressLayout;
    private myAddressFlag = false;

    private resulution = 1;

    private printContents = [];

    private sheetImage;
    private prevewImage;

    constructor(
    ) {}

    setSheetSpec(spec): void {
        this.setParams(spec, 'sheetSpec');
    }
    setTextDesine(desine): void {
        this.setParams(desine, 'textDesine');
    }
    setPrintOption(option): void {
        this.setParams(option, 'printOption');
    }
    setAddressLayout(layout): void {
        this.addressLayout = layout;
    }
    setMyAddressLayout(layout): void {
        this.myAddressLayout = layout;
        this.myAddressFlag = true;
    }
    setPrintContents(contents): void {
        this.printContents = contents;
    }
    setResulution(magnification): void {
        this.resulution = magnification;
    }

    /**
     * ■パラメーターの設定
     * 同一keyを持ったパラメーターに設定値を代入
     * @param propatie 設定パラメーター
     * @param target 設定先
     */
    setParams(propatie, target): void {
        for (const key in propatie) {
            if (propatie.hasOwnProperty(key)) {
                console.log(key + ': ' + propatie[key]);
                this[target][key] = propatie[key];
            }
        }
    }

    sheetMaker(): void {

        // this.doEnlargement();

        const oc = <HTMLCanvasElement> document.createElement('canvas');
        const ctx = oc.getContext('2d');
        const sd = this.sheetSpec;
        const po = this.printOption;
        const rectPoints = [];

        oc.setAttribute('width', (this.sheetSize.width).toString());
        oc.setAttribute('height', (this.sheetSize.height).toString());
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, this.sheetSize.width, this.sheetSize.height);
        ctx.strokeRect(0, 0, this.sheetSize.width, this.sheetSize.height);
        ctx.textAlign = 'start';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = 'rgb(0, 0, 0)';

        const img = new Image();
        img.onload = (e) => {
            ctx.drawImage(img, 0, 0, this.sheetSize.width, this.sheetSize.height);
            const transmittedImageData = ctx.getImageData(0, 0, this.sheetSize.width, this.sheetSize.height);
            const transmittedData = transmittedImageData.data;


            for (const key in this.addressLayout) {
                if (this.addressLayout.hasOwnProperty(key)) {
                    if (this.printContents[key] !== '') {
                        ctx.font = this.addressLayout[key][4] + 'px "' + this.textDesine.fontDesine + '"';
                        if (key === 'postcode') {
                            ctx.fillText(
                                this.printContents[key],
                                this.addressLayout[key][0] * this.resulution,
                                this.addressLayout[key][1] * this.resulution);
                        } else {
                            for (const n in this.printContents[key]) {
                                if (this.printContents[key].hasOwnProperty(n)) {
                                    ctx.fillText(
                                        this.printContents[key][n],
                                        this.addressLayout[key][0] * this.resulution,
                                        this.resulution * (this.addressLayout[key][1] + (Number(n) * this.addressLayout[key][4] + 5)));
                                }
                            }
                        }
    
                    }
                }
            }
            if (this.myAddressFlag) {
                for (const key in this.myAddressLayout) {
                    if (this.myAddressLayout.hasOwnProperty(key)) {
                        if (this.printContents[key] !== '') {
                            ctx.font = this.myAddressLayout[key][4] + 'px "' + this.textDesine.fontDesine + '"';
                            ctx.fillText(
                                this.printContents[key],
                                this.myAddressLayout[key][0],
                                this.myAddressLayout[key][1]);
                        }
                    }
                }
            }
            this.sheetImage = oc.toDataURL('image/jpg');

            this.prevewImage = oc.toDataURL('image/jpg');
        };
        img.src = this.getTestImage();
    }



    /**
     * 指定倍率の応じたシートサイズの拡大
     */
    doEnlargement(): void {
        for (const key in this.sheetSpec) {
            if (this.sheetSpec.hasOwnProperty(key)) {
                this.sheetSpec[key] = this.sheetSpec[key] * this.resulution;
            }
        }
        this.sheetSize.width = this.sheetSize.width * this.resulution;
        this.sheetSize.height = this.sheetSize.height * this.resulution;
    }

    getSheetImage(): string {
        return this.sheetImage;
    }
    getPreviewImage(): string {
        return this.prevewImage;
    }

    initialization(): void {
        this.sheetImage = null;
        this.sheetSize = {
            width: 210,
            height: 297
        };
        this.sheetSpec = {
            marginTop: 0,
            marginLeft: 0,
        };

        this.textDesine = {
            fontDesine: 'MS PMincho',
            fontWeight: 'normal',
        };

        this.resulution = 1;
        this.printContents = [];
    }

    private getTestImage(): string {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAEoC' +
        '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' +
        '6aSjacAAAAASUVORK5CYA==';
    }
}


