import { Injectable } from '@angular/core';

@Injectable()
export class TacksheetMakerService {

    /**
     * 印刷サイズ
     * A4を350dpiで出力する場合
     * 横2894px、縦4093px必要
     * 倍率は13.78095倍
     */
    private sheetSize = {
        /* width: 794,
        height: 1123 */
        width: 210,
        height: 297
    };
    /**
     * ラベルに関するサイズ、余白情報
     */
    private sheetSpec = {
        marginTop: 0,       // ページ余白上
        marginLeft: 0,      // ページ余白左
        cellWidth: 0,       // セルの横幅
        cellHeight: 0,      // セルの高さ
        cellMarginTop: 0,   // セルの余白上
        cellMarginLeft: 0   // セルの余白左
    };
    /**
     * 文字デザイン
     */
    private textDesine = {
        fontSize: 30,
        fontDesine: 'MS PMincho',
        fontWeight: 'normal'
    };
    /**
     * 
     */
    private printOption = {
        cellCount: 1,
        startPosition: 0,
        printCount: 1
    };
    private resulution = 1;

    private contents = [];

    private sheetImage;

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
        oc.setAttribute('width', (this.sheetSize.width).toString());
        oc.setAttribute('height', (this.sheetSize.height).toString());
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, this.sheetSize.width, this.sheetSize.height);

        ctx.font = this.textDesine.fontSize + 'px "' + this.textDesine.fontDesine + '"';
        console.log(ctx.font);
        ctx.textAlign = 'start';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = 'rgb(0, 0, 0)';

        let textCount = 0;
        let widthCount = 0;
        let heightCount = 0;
        let printCount = 1;

        for (let i = 0; i < po.cellCount; i++) {
            let X = (sd.cellWidth * widthCount) + (sd.cellMarginLeft * widthCount) + sd.marginLeft;
            if (X + sd.cellWidth > this.sheetSize.width) {
                widthCount = 0;
                heightCount++;
                X = (sd.cellWidth * widthCount) + (sd.cellMarginLeft * widthCount) + sd.marginLeft;
            }
            widthCount++;

            if (i >= po.startPosition
                && printCount <= po.printCount) {
                let Y = (sd.cellHeight * heightCount) + (sd.cellMarginTop * heightCount) + sd.marginTop;
                for (const key in this.contents[textCount]) {
                    if (this.contents[textCount].hasOwnProperty(key)) {
                        Y = Y + this.textDesine.fontSize + 23;
                        ctx.fillText(this.contents[textCount][key], X, Y);
                    }
                }
                printCount++;
                textCount++;
            }
        }
        this.sheetImage = oc.toDataURL('image/jpg');

    }
    doEnlargement(): void {
        for (const key in this.sheetSpec) {
            if (this.sheetSpec.hasOwnProperty(key)) {
                this.sheetSpec[key] = this.sheetSpec[key] * this.resulution;
            }
        }
        this.sheetSize.width = this.sheetSize.width * this.resulution;
        this.sheetSize.height = this.sheetSize.height * this.resulution;
        this.textDesine.fontSize = this.textDesine.fontSize * (this.resulution / 2);
    }

    getSheetImage(): string {
        return this.sheetImage;
    }

}

