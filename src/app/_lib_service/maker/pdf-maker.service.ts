import { Injectable } from '@angular/core';
// import { SAWARABI_PDF_FONTS } from './SawarabiPDFFonts';
import { CUSTOM_PDF_FONTS } from './CustomPDFFonts';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as vfsFonts from 'pdfmake/build/vfs_fonts.js';

@Injectable()
export class PdfMakerService {

    constructor(
        // private Pdfmake: any = new pdfMake
    ) {
        // フォント設定を行う
        pdfMake.fonts = {
            ipag: {
                normal: 'ipa_gothic.ttf',
                bold: 'ipa_gothic.ttf',
                italics: 'ipa_gothic.ttf',
                bolditalics: 'ipa_gothic.ttf'
            }
        };
        pdfMake.vfs = CUSTOM_PDF_FONTS;
    }

    // 本家createPdfのラッパー、デフォルトフォントを設定
    createPdf(docDefinition: any) {
        docDefinition.defaultStyle = docDefinition.defaultStyle || {};
        docDefinition.defaultStyle.font = 'ipag';

        // noinspection TypeScriptUnresolvedFunction
        return pdfMake.createPdf(docDefinition);
    }

    testPdfMake(docDefinition: any) {
        docDefinition.defaultStyle = docDefinition.defaultStyle || {};
        // docDefinition.defaultStyle.font = 'msgothic';
        return pdfMake.createPdf(docDefinition);
    }
    pdfMakeForIE(docDefinition: any) {
        docDefinition.defaultStyle = docDefinition.defaultStyle || {};
        // docDefinition.defaultStyle.font = 'msgothic';
        pdfMake.createPdf(docDefinition).download('optionalName.pdf');
    }

    // URLの取得にもラップをかける
    createPdfUrl(docDefinition: any) {

        // callbackが嫌なのでなんとなくPromiseで実装
        return new Promise((resolve) => {
            const pdfDocGenerator = this.createPdf(docDefinition);

            setTimeout(() => {
                pdfDocGenerator.getDataUrl((url: any) => {
                    setTimeout(() => {
                        resolve(url);
                    });
                });
            });
        });
      }
}

