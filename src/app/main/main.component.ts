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
        const result = 10;
        this.tacksheetmakeService.setSheetSpec({
            marginTop: 23.3 * result,
            marginLeft: 7 * result,
            cellWidth: 96.5 * result,
            cellHeight: 44.5 * result,
            cellMarginTop: 0 * result,
            cellMarginLeft: 6.5 * result,
        });
        this.tacksheetmakeService.setTextDesine({
            fontSize: 100,
        });
        this.tacksheetmakeService.setPrintOption({
            count: 12,
            start: 1
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
