import { Injectable } from '@angular/core';

@Injectable()
export class PrintLayoutService {

    sheetSize = 'a4';
    sheetSpec = {width: 210, height: 297};
    sheetResolution = 2.83333;

    setSheetSize(sheet: string): void {
        this.sheetSize = sheet;
    }

    setSheetSpec(width: number, height: number): void {
        this.sheetSpec.width = width;
        this.sheetSpec.height = height;
    }
    setSheetResolution(result: number): void {
        this.sheetResolution = result;
    }

    makePdfLayout(content): any {

        const docDefinition = {
            pageSize: this.sheetSize,
            pageMargins: [0, 0, 0, 0],
            content: [
                {
                    image: content,
                    width: this.sheetSpec.width * this.sheetResolution,
                    height: this.sheetSpec.height * this.sheetResolution
                },
            ],
            styles: {

            },
            defaultStyle: {
            }
        };
        return docDefinition;

    }
    makePdfLayoutMulti(contents): any {
        const _content = [];
        for (const key in contents) {
            if (contents.hasOwnProperty(key)) {
                _content.push({
                    image: contents[key],
                    width: this.sheetSpec.width * this.sheetResolution,
                    height: this.sheetSpec.height * this.sheetResolution,
                    pageBreak: 'after'
                });
            }
        }
        const docDefinition = {
            pageMargins: [0, 0, 0, 0],
            content: [_content],
            styles: {},
            defaultStyle: {}
        };
        return docDefinition;
    }

}
