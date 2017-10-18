import { Injectable } from '@angular/core';

@Injectable()
export class RecruiteLayoutService {
    private FName: String = 'test';
    private Name: String = 'test';
    private image: String = '';

    constructor() {
    }
    setName(name: String): void {
        this.Name = name;
    }
    setFName(name: String): void {
        this.FName = name;
    }
    setImage(url: String): void {
        this.image = url;
    }

    makePdfLayout(): any {

        const docDefinition = {
            content: [
                {
                    columns: [
                        {
                            width: 380,
                            margin: [0, 45, 0, 0],
                            table: {
                                widths: [
                                    260, 90, 10
                                ],
                                body: [
                                    [{text: 'ふりがな', style: 'cell_small', colSpan: 2}, ''],
                                    [{text: '氏名\n　\n' + this.FName, style: 'cell_large', colSpan: 2}, ''],
                                    ['生年月日　\n', '性別\n']
                                ]
                            },

                        },
                        {
                            width: 100,
                            image: this.image,
                            margin: [50, 0, 0, 5]
                        }
                    ]
                },
                {
                    table: {
                        widths: [
                            380, 100
                        ],
                        body: [
                            ['ふりがな', {text: '電話番号\n', rowSpan: 2}],
                            [{text: '現住所\n　\n　\n' + this.Name, rowSpan: 3}, ''],
                            ['', {text: 'メールアドレス\n', rowSpan: 2}],
                            ['', ''],
                            ['ふりがな', {text: '電話番号\n', rowSpan: 2}],
                            [{text: '連絡先\n　\n　\n', rowSpan: 3}, ''],
                            ['', {text: 'メールアドレス\n', rowSpan: 2}],
                            ['', '']
                        ]
                    },
                    margin: [0, 10, 0, 0]
                },
                {
                    table: {
                        widths: [
                            40, 20, 420
                        ],
                        body: [
                            ['年', '月', '学歴・職歴'],
                            ['　\n\n', '', ''],
                            ['　\n\n', '', ''],
                            ['　\n\n', '', ''],
                            ['　\n\n', '', ''],
                            ['　\n\n', '', ''],
                            ['　\n\n', '', ''],
                            ['　\n\n', '', ''],
                            ['　\n\n', '', ''],
                            ['　\n\n', '', ''],
                            ['　\n\n', '', ''],
                            ['　\n\n', '', '']
                        ]
                    },
                    margin: [0, 10, 0, 0]
                }

            ],
            styles: {
                cell_small: {
                    fontSize: 9
                },
                cell_large: {
                    fontSize: 10
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
