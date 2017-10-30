import { Component } from '@angular/core';
import { PdfMakerService } from '../_lib_service/index';
import { ListLayoutService, RecruiteLayoutService } from '../_lib_service/index';
@Component ({
    selector: 'print-dashboard',
    templateUrl: `./main.component.html`
})

export class MainComponent {

    constructor(
        private pdfmakerService: PdfMakerService,
        private listlayoutService: ListLayoutService,
        private recruitelayoutService: RecruiteLayoutService,
    ) {
    }

    buildPdf(): void {
        this.recruitelayoutService.setFName('aaaaa');
        this.recruitelayoutService.setName('aaaaa');
        const layout = this.recruitelayoutService.makePdfLayout();
        const pdf = this.pdfmakerService.testPdfMake(layout);
        pdf.print();
    }
}
