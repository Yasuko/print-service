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

        ctx.strokeRect(20, 20, 80, 40);

        return oc.toDataURL('image/jpg');

    }



    /**
     * シートの枠を描画
     * @param ctx canvasコンテキスト
     * @param x ｘ座標
     * @param y Y座標
     * @param h 高さ（ポジション指定の幅になる）
     * @param w 幅（ポジション指定の高さになる）
     * @param r 円弧の半径
     */
    setRoundRect(ctx, x, y, h, w, r): void {
        ctx.beginPath();
        ctx.moveTo(x, y + r);
        ctx.arc(x + r,   y + w - r, r, Math.PI, Math.PI / 2, 1);
        ctx.arc(x + h - r, y + w - r, r, Math.PI / 2, 0, 1);
        ctx.arc(x + h - r, y + r,   r, 0, Math.PI * 3 / 2, 1);
        ctx.arc(x + r,   y + r,   r, Math.PI * 3 / 2, Math.PI, 1);
        ctx.closePath();
    }

}

