import { Injectable } from '@angular/core';

@Injectable()
export class CsvMakerService {
    private csvName: String = 'test';

    constructor() {
    }
    setCsvName(name: String): void {
        this.csvName = name;
    }
    getCsv(data: any): void {
        console.log('start csv maker');
        const csv_array = data;
        let csv_string = '';
        for (let i = 0; i < csv_array.length; i++) {
            csv_string += csv_array[i];
            csv_string += '\r\n';
        }

        // BOM追加
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
        csv_string = '\ufffe' + csv_string;

        // ファイル作成
        const blob = new Blob([bom, csv_string] , {
            type: 'text/csv;charset=utf-8;'
        });

        // ダウンロード実行
        if (window.navigator.msSaveOrOpenBlob) {
            // IE
            navigator.msSaveBlob(blob, this.csvName + '.csv');
        } else {
            // IE以外(Chrome, Firefox)
            const downloadLink = document.createElement('a');
            downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
            downloadLink.setAttribute('download', this.csvName + '.csv');
            downloadLink.setAttribute('target', '_blank');

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }

    convObjectToCSV(content: any[]): any[] {
        const convData: any[] = [];
        for (const key in content) {
            if (content.hasOwnProperty(key)) {
                const element = content[key];
                convData.push(Object.keys(element)
                    .map(function (key) {
                        return element[key];
                    }));
            }
        }
        return convData;
    }

}
