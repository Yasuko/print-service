import { Injectable } from '@angular/core';


@Injectable()
export class ImageOrientationService {


    constructor() {}

    getOrientation(imgDataURL: string): void {
        const byteString = atob(imgDataURL.split(',')[1]);
        const orientaion = this.byteStringToOrientation(byteString);
        return orientaion;
    }
    byteStringToOrientation(img: string): void {
        let head = 0;
        let orientation;
        while (1) {
            if (img.charCodeAt(head) === 255 && img.charCodeAt(head + 1) === 218) { break; }
            if (img.charCodeAt(head) === 255 && img.charCodeAt(head + 1) === 216) {
                head += 2;
            } else {
                const length = img.charCodeAt(head + 2) * 256 + img.charCodeAt(head + 3);
                const endPoint = head + length + 2;
                if (img.charCodeAt(head) === 255 && img.charCodeAt(head + 1) === 225) {
                    const segment = img.slice(head, endPoint);
                    const bigEndian = segment.charCodeAt(10) === 77;
                    let count;
                    if (bigEndian) {
                        count = segment.charCodeAt(18) * 256 + segment.charCodeAt(19);
                    } else {
                        count = segment.charCodeAt(18) + segment.charCodeAt(19) * 256;
                    }
                    for (let i = 0; i < count; i++) {
                        const field = segment.slice(20 + 12 * i, 32 + 12 * i);
                        if ((bigEndian && field.charCodeAt(1) === 18) || (!bigEndian && field.charCodeAt(0) === 18)) {
                            orientation = bigEndian ? field.charCodeAt(9) : field.charCodeAt(8);
                        }
                    }
                    break;
                }
                head = endPoint;
            }
            if (head > img.length) { break; }
        }
        return orientation;
    }
}

