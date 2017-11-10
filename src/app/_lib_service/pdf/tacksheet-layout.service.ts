import { Injectable } from '@angular/core';

@Injectable()
export class TacksheetLayoutService {

    makePdfLayout(content): any {

        const docDefinition = {
            pageMargins: [0, 0, 0, 0],
            content: [
                {
                    image: content,
                    width: 595,
                    height: 842
                },
            ],
            styles: {

            },
            defaultStyle: {
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

    getTextLayout(layout: string): number[] {
        const Layouts = {
            line1: [[10, 50, 20]],
            line2: [[10, 30, 20], [10, 70, 20]],
            line3: [[10, 20, 15], [10, 50, 15], [10, 80, 15]],
            line4: [[10, 20, 10], [10, 40, 10], [10, 60, 10], [10, 80, 10]],
            line5: [[10, 15, 8], [10, 30, 8], [10, 45, 8], [10, 60, 8], [10, 75, 8]],
            address3: [[10, 20, 10], [10, 40, 8], [80, 80, 12]],
            address4: [[10, 15, 10], [10, 35, 8], [10, 55, 8], [80, 80, 12]],
            address5: [[10, 10, 10], [10, 35, 8], [10, 47, 8], [10, 60, 8], [80, 80, 10]],
        };
        return Layouts[layout];
    }
}
