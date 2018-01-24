import { Injectable } from '@angular/core';

@Injectable()
export class RecruiteMakerService {

    resolution = 1;
    faceShot;

    LayoutPage1;
    LayoutPage2;

    Width = 0;
    Height = 0;
    baseWidth = 210;
    baseHeight = 297;

    setBaseSheetSize(width, height): void {
        this.baseWidth = width;
        this.baseHeight = height;
    }

    setFaceShot(img): void {
        this.faceShot = img;
    }
    setResolution(num): void {
        this.resolution = num;
    }
    setLayout(img: string[]): void {
        this.LayoutPage1 = img[0];
        this.LayoutPage2 = img[1];
    }

    sheetMaker() {
        this.Width = 210 * this.resolution;
        this.Height = 297 * this.resolution;

        const oc = <HTMLCanvasElement> document.createElement('canvas');
        const ctx = oc.getContext('2d');

        oc.setAttribute('width', (this.Width).toString());
        oc.setAttribute('height', (this.Height).toString());
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, this.Width, this.Height);

        // ctx.strokeRect(20, 20, 80, 40);
        return oc.toDataURL('image/jpg');

    }
    resolutions(): void {
        this.Width = this.baseWidth * this.resolution;
        this.Height = this.baseHeight * this.resolution;
    }
    makeRecruiteLayout(): any {
        this.resolutions();
        const docDefinition = {
            pageMargins: [0, 0, 0, 0],
            content: [
                {
                    image: this.LayoutPage1,
                    width: 595,
                    height: 842,
                    margin: [0, 0, 0, 0],
                    pageBreak: 'after'
                },
                {
                    image: this.LayoutPage2,
                    width: 595,
                    height: 842,
                    margin: [0, 0, 0, 0]
                },
                ],
                defaultStyle: {
                    font: 'ipag'
                }
            };
        return docDefinition;
    }
}

