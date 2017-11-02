import { Component } from '@angular/core';
import { PdfMakerService } from '../_lib_service/index';
import { TacksheetLayoutService } from '../_lib_service/index';
import { TacksheetMakerService, ImageSaveService } from '../_lib_service/index';
@Component ({
    selector: 'print-dashboard',
    templateUrl: `./main.component.html`
})

export class MainComponent {

    constructor(
        private pdfmakerService: PdfMakerService,
        private tacksheetlayoutService: TacksheetLayoutService,
        private tacksheetmakeService: TacksheetMakerService,
        private imagesaveService: ImageSaveService
    ) {
    }

    buildPdf(): void {
        // const result = 3.781;

        this.tacksheetmakeService.setResulution(13.78095);
        this.tacksheetmakeService.setSheetSpec({
            marginTop: 23.3,
            marginLeft: 7,
            cellWidth: 96.5,
            cellHeight: 44.5,
            cellMarginTop: 0,
            cellMarginLeft: 6.5,
        });
        this.tacksheetmakeService.setTextDesine({
            fontSize: 10,
        });
        this.tacksheetmakeService.setPrintOption({
            cellCount: 12,
            startPosition: 3,
            printCount: 4
        });
        this.tacksheetmakeService.setContents([
            [['ああああああ'], ['aaaaaaaaaaaa'], ['aaaaaaaaaaaa']],
            [['aaaaaaa'], ['aaaaaaaaaaaa'], ['aaaaaaaaaaaa']],
            [['aaaaaaa'], ['aaaaaaaaaaaa'], ['aaaaaaaaaaaa']],
            [['aaaaaaa'], ['aaaaaaaaaaaa'], ['aaaaaaaaaaaa']],
            [['aaaaaaa'], ['aaaaaaaaaaaa'], ['aaaaaaaaaaaa']],
            [['aaaaaaa'], ['aaaaaaaaaaaa'], ['aaaaaaaaaaaa']],
            [['aaaaaaa'], ['aaaaaaaaaaaa'], ['aaaaaaaaaaaa']],
            [['aaaaaaa'], ['aaaaaaaaaaaa'], ['aaaaaaaaaaaa']],
            [['aaaaaaa'], ['aaaaaaaaaaaa'], ['aaaaaaaaaaaa']],
            [['aaaaaaa'], ['aaaaaaaaaaaa'], ['aaaaaaaaaaaa']],
            [['aaaaaaa'], ['aaaaaaaaaaaa'], ['aaaaaaaaaaaa']],
            [['aaaaaaa'], ['aaaaaaaaaaaa'], ['aaaaaaaaaaaa']],
        ]);
        this.tacksheetmakeService.sheetMaker();
        const image = this.tacksheetmakeService.getSheetImage();

        const layout = this.tacksheetlayoutService.makePdfLayout(image);
        const pdf = this.pdfmakerService.testPdfMake(layout);
        pdf.print();
/*         this.imagesaveService.setParam(
            'base',
            'image/jpg',
            image
        );

        this.imagesaveService.saveImage(); */

    }
}
