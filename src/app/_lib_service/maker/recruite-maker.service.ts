import { Injectable } from '@angular/core';

@Injectable()
export class TacksheetMakerService {

    sheetMaker() {

        const oc = <HTMLCanvasElement> document.createElement('canvas');
        const ctx = oc.getContext('2d');

        oc.setAttribute('width', (210).toString());
        oc.setAttribute('height', (297).toString());
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, 210, 297);

        // ctx.strokeRect(20, 20, 80, 40);
        this.setRoundRect();

        return oc.toDataURL('image/jpg');

    }



    /**
     * シートの枠を描画
     * @param ctx canvasコンテキスト
     */
    setAddressRect(ctx): void {
        ctx.beginPath();
        ctx.moveTo(18.27, 32.29);
        ctx.lineTo(141.44, 32.29);
        ctx.lineTo(141.44, 64.55);
        ctx.lineTo(186.86, 64.55);
        ctx.lineTo(186.86, 64.55);
        ctx.lineTo(186.86, 118.50);
        ctx.lineTo(18.27, 118.50);
        ctx.lineTo(18.27, 32.29);
        ctx.closePath();

        const addressPathSet = {
            nameRuby: [18.27, 35.84, 101.31, 35.84],
            sex: [101.31, 32.29, 101.31, 54.74],
            name: [18.27, 51.13, 141.44, 54.74],
            birth: [18.27, 64.17, 186.86, 64.17],
            addressRuby: [18.27, 68.87, 186.86, 68.87],
            address: [18.27, 81.43, 186.86, 81.43],
            tel: [18.27, 89.94, 186.86, 89.94],
            fax: [18.27, 98.32, 186.86, 98.32],
            contactRuby: [18.27, 105.21, 186.86, 105.21],
            contact: [18.27, 89.94, 186.86, 89.94],
        };
        for (const key in addressPathSet) {
            if (addressPathSet.hasOwnProperty(key)) {
                const p = addressPathSet[key];
                ctx.beginPath();
                ctx.moveTo(p[0], p[1]);
                ctx.lineTo(p[2], p[3]);
                ctx.closePath();
            }
        }
        ctx.moveTo(18.27, 89.94);    // TEL
        ctx.lineTo(186.86, 89.94);
        ctx.closePath();
        ctx.moveTo(18.27, 98.32);    // FAX
        ctx.lineTo(186.86, 98.32);
        ctx.closePath();
        ctx.moveTo(18.27, 105.21);    // 連絡先ふりがな
        ctx.lineTo(133.29, 105.21);
        ctx.closePath();
        ctx.moveTo(102.56, 81.43);    // 連絡先
        ctx.lineTo(102.56, 98.32);
        ctx.closePath();
        ctx.moveTo(133.29, 98.32);    // 携帯、mail縦線
        ctx.lineTo(133.29, 118.50);
        ctx.closePath();

        ctx.moveTo(18.27, 126.76);    // 学歴職歴
        ctx.lineTo(186.86, 118.50);
        ctx.lineTo(186.86, 264.99);
        ctx.lineTo(18.27, 264.99);
        ctx.lineTo(18.27, 126.76);
        ctx.closePath();

        ctx.moveTo(18.27, 133.03);
        ctx.lineTo(186.86, 133.03);
        ctx.closePath();
        ctx.moveTo(18.27, 142.46);
        ctx.lineTo(186.86, 142.46);
        ctx.closePath();
    }

    setHistoryRect(ctx): void {
        ctx.beginPath();
        ctx.moveTo(18.27, 126.76);    // 学歴職歴
        ctx.lineTo(186.86, 118.50);
        ctx.lineTo(186.86, 264.99);
        ctx.lineTo(18.27, 264.99);
        ctx.lineTo(18.27, 126.76);
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(18.27, 133.03);
        ctx.lineTo(186.86, 133.03);
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(18.27, 142.46);
        ctx.lineTo(186.86, 142.46);
        ctx.closePath();
    }

}

