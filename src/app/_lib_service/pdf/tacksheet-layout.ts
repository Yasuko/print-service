import { Injectable } from '@angular/core';

@Injectable()
export class TacksheetLayoutService {
    private marginTop = 0;
    private marginLeft = 0;
    private cellWidth = 0;
    private cellHeight = 0;
    private cellMarginTop = 0;
    private cellMarginLeft = 0;
    private fontSize = 10;

    private layout = '';
    constructor() {
    }
    setSheetSpec(spec): void {
        this.marginTop = spec['marginTop'];
        this.marginLeft = spec['marginLeft'];
        this.cellWidth = spec['cellWidth'];
        this.cellHeight = spec['cellHeight'];
        this.cellMarginTop = spec['cellMarginTop'];
        this.cellMarginLeft = spec['cellMarginLeft'];
    }
    setSheetDesine(): void {

    }

    makePdfLayout(content): any {

        const cellLayout = {
            cell1: [this.cellWidth],
            cell2: [this.cellWidth, this.cellWidth],
            cell3: [this.cellWidth, this.cellWidth, this.cellWidth],
            cell4: [this.cellWidth, this.cellWidth, this.cellWidth, this.cellWidth],
            cell5: [this.cellWidth, this.cellWidth, this.cellWidth, this.cellWidth, this.cellWidth],
        };

        const docDefinition = {
            pageMargins: [this.marginLeft, this.marginTop, 1, 1],
            content: [
                {
                    columns: [
                        {
                        width: this.cellWidth,
                        style: 'cell',
                        table: {
                            widths: cellLayout[this.layout],
                            body: content,
                            style: 'cell'
                        },
                        }
                    ]
                }
            ],
            styles: {
                cell: {
                    height: this.cellHeight,
                    marginLeft: this.cellMarginLeft,
                    marginTop: this.cellMarginTop
                },
                cellprop: {
                    width: this.cellWidth,
                    fontSize: this.fontSize
                }
            },
            defaultStyle: {
                font: 'ipag'
            }
        };
        return docDefinition;

    }
    convObjectToArray(content: any[]): any[] {
        const convData: any[] = [];
        const returnData: any[] = [];
        for (const key in content) {
            if (content.hasOwnProperty(key)) {
                const element = content[key];
                convData.push(Object.keys(element)
                    .map(function (key) {
                        return element[key];
                    }));
                returnData.push(convData);
            }
        }
        return convData;
    }

}
