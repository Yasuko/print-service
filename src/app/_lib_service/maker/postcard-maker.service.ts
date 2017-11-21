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
        fontSize: 30,
        fontDesine: 'MS PMincho',
        fontWeight: 'normal',
        textMargin: 2
    };
    /**
     * 印刷オプション
     */
    private printOption = {
    };

    private textLayout;


    private resulution = 1;

    private contents = [];

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
    setTextLayout(layout): void {
        this.textLayout = layout;
    }
    setContents(contents): void {
        this.contents = contents;
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




        this.sheetImage = oc.toDataURL('image/jpg');

        for (const key in rectPoints) {
            if (rectPoints.hasOwnProperty(key)) {
                const rp = rectPoints[key];
                ctx.stroke();
            }
        }
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
        this.textDesine.fontSize = this.textDesine.fontSize * (this.resulution / 2);
        this.textDesine.textMargin = this.textDesine.textMargin * this.resulution;
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
            fontSize: 30,
            fontDesine: 'MS PMincho',
            fontWeight: 'normal',
            textMargin: 2
        };

        this.resulution = 1;
        this.contents = [];
    }
}

