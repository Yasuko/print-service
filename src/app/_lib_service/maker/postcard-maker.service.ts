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

        this.doEnlargement();

        const oc = <HTMLCanvasElement> document.createElement('canvas');
        const ctx = oc.getContext('2d');
        const sd = this.sheetSpec;
        const po = this.printOption;
        const rectPoints = [];

        oc.setAttribute('width', (this.sheetSize.width).toString());
        oc.setAttribute('height', (this.sheetSize.height).toString());
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, this.sheetSize.width, this.sheetSize.height);

        console.log(ctx.font);
        ctx.textAlign = 'start';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = 'rgb(0, 0, 0)';

        for (const key in this.addressLayout) {
            if (this.addressLayout.hasOwnProperty(key)) {
                if (this.printContents[key] !== '') {
                    console.log(this.addressLayout[key][4] + ':' + this.addressLayout[key][0] + this.addressLayout[key][1]);
                    ctx.font = this.addressLayout[key][4] + 'px "' + this.textDesine.fontDesine + '"';
                    ctx.fillText(
                        this.printContents[key],
                        this.addressLayout[key][0],
                        this.addressLayout[key][1]);
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
}

