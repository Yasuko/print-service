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
        fontWeight: 'normal',
        textMargin: 2
    };
    /**
     * 印刷オプション
     */
    private printOption = {
        cellCount: 1,
        startPosition: 0,
        printCount: 1
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
            let Y = (sd.cellHeight * heightCount) + (sd.cellMarginTop * heightCount) + sd.marginTop;

            widthCount++;
            rectPoints[i] = [X, Y, sd.cellWidth, sd.cellHeight];

            if (i >= po.startPosition
                && printCount <= po.printCount) {
                let lineCount = 0;
                for (const key in this.contents[textCount]) {
                    if (this.contents[textCount].hasOwnProperty(key)) {
                        if (this.textLayout[lineCount] !== undefined) {
                            const Layout = this.setLayout(this.textLayout[lineCount]);
                            // ctx.font = (Layout[2] * this.resulution) + 'px "' + this.textDesine.fontDesine + '"';
                            // const _Y = Y + (Layout[1] * this.resulution);
                            // const _X = X + (Layout[0] * this.resulution);
                            ctx.font = Layout[2] + 'px "' + this.textDesine.fontDesine + '"';
                            const _Y = Y + Layout[1];
                            const _X = X + Layout[0];
                            ctx.fillText(this.contents[textCount][key], _X, _Y);
                        } else {
                            ctx.font = this.textDesine.fontSize + 'px "' + this.textDesine.fontDesine + '"';
                            Y = Y + this.textDesine.fontSize + this.textDesine.textMargin;
                            ctx.fillText(this.contents[textCount][key], X, Y);
                        }
                        lineCount++;
                    }
                }
                printCount++;
                textCount++;
            }
        }
        this.sheetImage = oc.toDataURL('image/jpg');

        for (const key in rectPoints) {
            if (rectPoints.hasOwnProperty(key)) {
                const rp = rectPoints[key];
                this.setRoundRect(ctx, rp[0], rp[1], rp[2], rp[3], 50);
                ctx.stroke();
            }
        }
        this.prevewImage = oc.toDataURL('image/jpg');

    }

    setLayout(layout): number[] {
        const _layout = [0, 0, 0];
        const wResult = this.sheetSpec.cellWidth / (200 * this.resulution);
        const hResult = this.sheetSpec.cellHeight / (100 * this.resulution);
        const fResult = (wResult + hResult) / 2;
        console.log(wResult + '::' + hResult + '::' + fResult);
        _layout[0] = Math.round(layout[0] * this.resulution * wResult);
        _layout[1] = Math.round(layout[1] * this.resulution * hResult);
        _layout[2] = Math.round(layout[2] * this.resulution * fResult);

        return _layout;
    }

    /**
     * シートの枠を描画
     * @param ctx canvasコンテキスト
     * @param x ｘ座標
     * @param y Y座標
     * @param h 高さ（ポジション指定の幅になる）
     * @param w 幅（ポジション指定の高さになる）
     * @param r 円弧の半径
     */
    setRoundRect(ctx, x, y, h, w, r): void {
        ctx.beginPath();
        ctx.moveTo(x, y + r);
        ctx.arc(x + r,   y + w - r, r, Math.PI, Math.PI / 2, 1);
        ctx.arc(x + h - r, y + w - r, r, Math.PI / 2, 0, 1);
        ctx.arc(x + h - r, y + r,   r, 0, Math.PI * 3 / 2, 1);
        ctx.arc(x + r,   y + r,   r, Math.PI * 3 / 2, Math.PI, 1);
        ctx.closePath();
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
            cellWidth: 0,
            cellHeight: 0,
            cellMarginTop: 0,
            cellMarginLeft: 0
        };

        this.textDesine = {
            fontSize: 30,
            fontDesine: 'MS PMincho',
            fontWeight: 'normal',
            textMargin: 2
        };

        this.printOption = {
            cellCount: 1,
            startPosition: 0,
            printCount: 1
        };
        this.resulution = 1;
        this.contents = [];
    }
}

