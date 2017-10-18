import { Injectable } from '@angular/core';

@Injectable()
export class ListLayoutService {
    private csvName: String = 'test';

    constructor() {
    }
    setCsvName(name: String): void {
        this.csvName = name;
    }

    makePdfLayout(textContent: any): any {

        const docDefinition = {
            pageSize: {width: 847, height: 595},
            pageMargins: [10, 10, 10, 10],
            content: [
                {
                    table: {
                        widths: [
                            50,  170, 10,  10,  10,
                            10,  10,  10,  10, 60,
                            60, 60,  30,  30,  30,
                            30, 10, 10],
                        body: this.convObjectToArray(textContent),
                        style: 'name'
                    },
                }
            ],
            styles: {
                name: {
                    fontSize: 5
                },
                voice: {
                    fontSize: 24
                },
                right: {
                    alignment: 'right'
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
