import { Injectable } from '@angular/core';

@Injectable()
export class TacksheetMakerService {

    private sheetSize = {
        /* width: 794,
        height: 1123 */
        width: 2100,
        height: 2970
    };
    private sheetSpec = {
        marginTop: 0,
        marginLeft: 0,
        cellWidth: 0,
        cellHeight: 0,
        cellMarginTop: 0,
        cellMarginLeft: 0
    };
    private textDesine = {
        fontSize: 30,
        fontDesine: 'Century Gothic',
        fontWeight: 'normal'
    };

    private cellCount = 1;
    private startPosition = 0;

    private contents = [];

    private sheetImage;

    constructor(
    ) {}

    setSheetSpec(spec): void {
        for (const key in spec) {
            if (spec.hasOwnProperty(key)) {
                this.sheetSpec[key] = spec[key];
            }
        }
    }
    setContents(contents): void {
        this.contents = contents;
    }
    setTextDesine(desine): void {
        for (const key in desine) {
            if (desine.hasOwnProperty(key)) {
                this.textDesine[key] = desine[key];
            }
        }
    }
    setPrintOption(option): void {
        this.cellCount = option['count'];
        this.startPosition = option['start'];
    }

    sheetMaker(): void {
        const oc = <HTMLCanvasElement> document.createElement('canvas');
        const ctx = oc.getContext('2d');
        const sd = this.sheetSpec;
        oc.setAttribute('width', (this.sheetSize.width).toString());
        oc.setAttribute('height', (this.sheetSize.height).toString());
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, this.sheetSize.width, this.sheetSize.height);

        ctx.font = this.textDesine.fontSize + 'px "' + this.textDesine.fontDesine + '"';
        console.log(ctx.font);
        ctx.textAlign = 'start';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        try {
        let textCount = 0;
        let widthCount = 0;
        let heightCount = 0;
        for (let i = 0; i < this.cellCount; i++) {
            let X = (sd.cellWidth * widthCount) + (sd.cellMarginLeft * widthCount) + sd.marginLeft;
            if (X > this.sheetSize.width) {
                widthCount = 0;
                heightCount++;

                X = (sd.cellWidth * widthCount) + (sd.cellMarginLeft * widthCount) + sd.marginLeft;
            }

            if (this.cellCount >= this.startPosition - 1) {
                let Y = (sd.cellHeight * heightCount) + (sd.cellMarginTop * heightCount) + sd.marginTop;
                for (const key in this.contents[textCount]) {
                    if (this.contents[textCount].hasOwnProperty(key)) {
                        Y = Y + this.textDesine.fontSize + 2;
                        ctx.fillText(this.contents[textCount][key], X, Y);
                    }
                }
                textCount++;
            }
            widthCount++;
        }
        this.sheetImage = oc.toDataURL('image/jpg');
        } catch (error) {
            console.log('build sheet image error : ' + error);
        }


    }


    getSheetImage(): string {
        return this.sheetImage;
    }

}

