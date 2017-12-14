import { Injectable } from '@angular/core';

@Injectable()
export class RecruiteMakerService {

    resolution = 1;
    faceShot;

    setFaceShot(img): void {
        this.faceShot = img;
    }
    setResolution(num): void {
        this.resolution = num;
    }

    sheetMaker() {
        const w = 210 * this.resolution;
        const h = 297 * this.resolution;

        const oc = <HTMLCanvasElement> document.createElement('canvas');
        const ctx = oc.getContext('2d');

        oc.setAttribute('width', (w).toString());
        oc.setAttribute('height', (h).toString());
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, w, h);


        // ctx.strokeRect(20, 20, 80, 40);
        this.setAddressRect(ctx);
        this.setHistoryRect(ctx);

        return oc.toDataURL('image/jpg');

    }



    /**
     * シートの枠を描画
     * @param ctx canvasコンテキスト
     */
    setAddressRect(ctx): void {
        ctx.strokeStyle = 'rgb(0, 0, 0)';
        ctx.lineWidth = 6;
        // 氏名・住所外枠作成
        ctx.beginPath();
        ctx.moveTo(18.27 * this.resolution, 32.29 * this.resolution);
        ctx.lineTo(141.44 * this.resolution, 32.29 * this.resolution);
        ctx.lineTo(141.44 * this.resolution, 64.55 * this.resolution);
        ctx.lineTo(186.86 * this.resolution, 64.55 * this.resolution);
        ctx.lineTo(186.86 * this.resolution, 64.55 * this.resolution);
        ctx.lineTo(186.86 * this.resolution, 118.50 * this.resolution);
        ctx.lineTo(18.27 * this.resolution, 118.50 * this.resolution);
        ctx.lineTo(18.27 * this.resolution, 32.29 * this.resolution);
        ctx.closePath();
        ctx.stroke();

        ctx.strokeStyle = 'rgb(0, 0, 0)';
        ctx.lineWidth = 3;
        // デザインベース　志望動機・自己PR広め、特技欄あり.pdf
        const addressPathSet = {
            nameRuby: [18.27, 35.84, 118.45, 35.84, 'ふりがな', 3, 20, 35],
            sex: [118.45, 32.29, 118.45, 54.74, '※ 男 ・ 女', 4, 120, 45.5],
            name: [18.27, 54.74, 141.44, 54.74, '氏　名', 6, 20, 46],
            birth: [18.27, 64.17, 141.44, 64.17, '生年月日　　　　　　　年　　　　　月　　　　　日　生（満　　　　才）', 4, 20, 60],
            addressRuby: [18.27, 68.87, 186.86, 68.87, 'ふりがな', 2, 20, 68],
            address: [18.27, 81.43, 186.86, 81.43, '現住所　　〒', 4, 20, 75],
            tel: [18.27, 89.94, 186.86, 89.94, 'TEL', 4, 20, 87],
            fax: [18.27, 98.32, 186.86, 98.32, 'FAX', 4, 20, 96],
            mobile: [100.29, 81.43, 100.29, 98.32, '携帯電話', 4, 101, 87],
            Email: [0, 0, 0, 0, 'E-mail', 4, 101, 96],
            contactRuby: [18.27, 102.21, 150, 102.21, 'ふりなが', 2, 20, 102],
            contact: [0, 0, 0, 0, '連絡先　〒', 4, 20, 108],
            contactTel: [150, 98.32, 150, 118.50, 'TEL', 4, 152, 105],
        };
        for (const key in addressPathSet) {
            if (addressPathSet.hasOwnProperty(key)) {
                const p = addressPathSet[key];
                if (p[0] > 0) {
                    ctx.beginPath();
                    ctx.moveTo(p[0] * this.resolution, p[1] * this.resolution);
                    ctx.lineTo(p[2] * this.resolution, p[3] * this.resolution);
                    ctx.closePath();
                    ctx.stroke();
                }

                ctx.font = (p[5] * this.resolution) + 'px "ＭＳ Ｐ明朝"';
                ctx.fillStyle = 'rgb(0, 0, 0)';
                ctx.fillText(p[4], p[6] * this.resolution, p[7] * this.resolution);
            }
        }

        ctx.font = (8 * this.resolution) + 'px "ＭＳ Ｐ明朝"';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('履　歴　書', 19 * this.resolution, 30 * this.resolution);
        ctx.font = (5 * this.resolution) + 'px "ＭＳ Ｐ明朝"';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('年　　　月　　　日　現在', 92 * this.resolution, 30 * this.resolution);
    }

    setHistoryRect(ctx): void {
        ctx.strokeStyle = 'rgb(0, 0, 0)';
        ctx.lineWidth = 6;
        // 学歴・職歴　外枠作成
        ctx.moveTo(18.27 * this.resolution, 126.76 * this.resolution);
        ctx.lineTo(186.86 * this.resolution, 126.76 * this.resolution);
        ctx.lineTo(186.86 * this.resolution, 264.99 * this.resolution);
        ctx.lineTo(18.27 * this.resolution, 264.99 * this.resolution);
        ctx.lineTo(18.27 * this.resolution, 126.76 * this.resolution);
        ctx.closePath();
        ctx.stroke();


        ctx.strokeStyle = 'rgb(0, 0, 0)';
        ctx.lineWidth = 3;
        // 学歴・職歴　補助線
        ctx.beginPath();
        ctx.moveTo(18.27 * this.resolution, 133.03 * this.resolution);
        ctx.lineTo(186.86 * this.resolution, 133.03 * this.resolution);
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(18.27 * this.resolution, 142.46 * this.resolution);
        ctx.lineTo(186.86 * this.resolution, 142.46 * this.resolution);
        ctx.closePath();
        ctx.stroke();
    }

}

