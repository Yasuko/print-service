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

}
