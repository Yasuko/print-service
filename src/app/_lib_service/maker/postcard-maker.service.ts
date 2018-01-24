import { Injectable } from '@angular/core';

@Injectable()
export class PostcardMakerService {

    /**
     * 印刷サイズ
     * はがきを350dpiで出力する場合
     * 横1378px、縦2040px必要
     * 倍率は13.78095倍
     */
    private sheetSize = {
        width: 100,
        height: 148
    };
    private sheetType = 'normal';
    /**
     * ラベルに関するサイズ、余白情報
     */
    private sheetSpec = {
        marginTop: 0,       // ページ余白上
        marginLeft: 0,      // ページ余白左
    };
    private postCodeMargin = [7, 4.3];

    /**
     * 文字デザイン
     */
    private textDesine = {
        fontDesine: 'MS PMincho',
        fontWeight: 'normal',
    };
    /**
     * 印刷オプション
     */
    private printOption = {
    };

    private addressLayout;
    private myAddressLayout;
    private myAddressFlag = false;

    private resulution = 1;

    private printContents = [];

    private sheetImage;
    private prevewImage;

    constructor(
    ) {}

    setSheetSpec(spec): void {
        this.setParams(spec, 'sheetSpec');
    }
    setSheetType(type: string): void {
        this.sheetType = type;
    }
    setTextDesine(desine): void {
        this.setParams(desine, 'textDesine');
    }
    setPrintOption(option): void {
        this.setParams(option, 'printOption');
    }
    setAddressLayout(layout): void {
        this.addressLayout = layout;
    }
    setMyAddressLayout(layout): void {
        this.myAddressLayout = layout;
        this.myAddressFlag = true;
    }
    setPrintContents(contents): void {
        this.printContents = contents;
    }
    setResulution(magnification): void {
        this.resulution = magnification;
    }

    /**
     * ■パラメーターの設定
     * 同一keyを持ったパラメーターに設定値を代入
     * @param propatie 設定パラメーター
     * @param target 設定先
     */
    setParams(propatie, target): void {
        for (const key in propatie) {
            if (propatie.hasOwnProperty(key)) {
                console.log(key + ': ' + propatie[key]);
                this[target][key] = propatie[key];
            }
        }
    }

    sheetMaker(): Promise<string> {

        this.doEnlargement();

        const oc = <HTMLCanvasElement> document.createElement('canvas');
        const ctx = oc.getContext('2d');
        const po = this.printOption;
        const rectPoints = [];

        oc.setAttribute('width', (this.sheetSize.width).toString());
        oc.setAttribute('height', (this.sheetSize.height).toString());
        // ctx.fillStyle = 'rgb(255, 255, 255, 0)';
        // ctx.fillRect(0, 0, this.sheetSize.width, this.sheetSize.height);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        // ctx.fillStyle = 'rgb(0, 0, 0, 0)';

        for (const key in this.addressLayout) {
            if (this.addressLayout.hasOwnProperty(key)) {
                if (this.printContents[key] !== '') {
                    ctx.font = this.addressLayout[key][4] + 'px "' + this.textDesine.fontDesine + '"';
                    if (key === 'postcode') {
                        for (const p in this.printContents[key]) {
                            if (this.printContents[key].hasOwnProperty(p)) {
                                ctx.fillText(
                                    this.printContents[key][p],
                                    this.addressLayout[key][0] + Number(p) * (this.postCodeMargin[0] * this.resulution),
                                    this.addressLayout[key][1]);
                            }
                        }
                    } else {
                        const margin = (key === 'company' || key === 'department') ? 0 : 0;

                        const layout = this.addressLayout[key];
                        for (const n in this.printContents[key]) {
                            if (this.printContents[key].hasOwnProperty(n)) {
                                ctx.fillText(
                                    this.printContents[key][n],
                                    layout[0],
                                    layout[1] + ((Number(n) + margin) * layout[4]));
                            }
                        }
                    }
                }
            }
        }
        if (this.myAddressFlag) {
            for (const key in this.myAddressLayout) {
                if (this.myAddressLayout.hasOwnProperty(key)) {
                    const layout = this.myAddressLayout[key];
                    ctx.font = layout[4] + 'px "' + this.textDesine.fontDesine + '"';
                    if (key === 'myPostcode') {
                        for (const p in this.printContents[key]) {
                            if (this.printContents[key].hasOwnProperty(p)) {
                                ctx.fillText(
                                    this.printContents[key][p],
                                    layout[0] + Number(p) * (this.postCodeMargin[1] * this.resulution),
                                    layout[1]);
                            }
                        }
                    } else {
                        const margin = 2.5;

                        for (const n in this.printContents[key]) {
                            if (this.printContents[key].hasOwnProperty(n)) {
                                ctx.fillText(
                                    this.printContents[key][n],
                                    layout[0],
                                    layout[1] + (Number(n) * (layout[4] + margin)));
                            }
                        }
                    }
                }
            }
        }
        this.sheetImage = oc.toDataURL('image/jpg');

        let sheetType = '';
        if (this.sheetType === 'normal') {
            sheetType = this.getNormalPostcardImage();
        } else {
            sheetType = this.getNewYearPostcardImage();
        }
        const loadImg = [sheetType, this.sheetImage];
        const imgs = [];
        let counter = 0;

        return new Promise((resolve, reject) => {

            const loadImage = () => {
                const img = new Image();
                    img.onload = (e) => {
                        counter++;
                        imgs.push(img);
                        if (counter === 2) {
                            ctx.drawImage(imgs[0], 0, 0, this.sheetSize.width, this.sheetSize.height);
                            ctx.drawImage(imgs[1], 0, 0, this.sheetSize.width, this.sheetSize.height);
                            this.prevewImage = oc.toDataURL('image/jpg');

                            resolve(this.prevewImage);
                        } else {
                            loadImage();
                    }
                };

                img.src = loadImg[imgs.length];
            };
            loadImage();
        });

    }



    /**
     * 指定倍率の応じたシートサイズの拡大
     */
    doEnlargement(): void {
        for (const key in this.addressLayout) {
            if (this.addressLayout.hasOwnProperty(key)) {
                this.addressLayout[key].forEach((element, index) => {
                    this.addressLayout[key][index] = this.addressLayout[key][index] * this.resulution;
                });
            }
        }

        if (this.myAddressFlag) {
            for (const key in this.myAddressLayout) {
                if (this.myAddressLayout.hasOwnProperty(key)) {
                    this.myAddressLayout[key].forEach((element, index) => {
                        this.myAddressLayout[key][index] = this.myAddressLayout[key][index] * this.resulution;
                    });
                }
            }
        }
        this.sheetSize.width = this.sheetSize.width * this.resulution;
        this.sheetSize.height = this.sheetSize.height * this.resulution;
    }

    getSheetImage(): string {
        return this.sheetImage;
    }
    getPreviewImage(): string {
        return this.prevewImage;
    }

    initialization(): void {
        this.sheetImage = null;
        this.sheetSize = {
            width: 100,
            height: 148
        };
        this.sheetSpec = {
            marginTop: 0,
            marginLeft: 0,
        };

        this.textDesine = {
            fontDesine: 'MS PMincho',
            fontWeight: 'normal',
        };

        this.resulution = 1;
        this.printContents = [];
        this.addressLayout = null;
        this.myAddressLayout = null;
        this.myAddressFlag = false;

        this.resulution = 1;

        this.printContents = [];

        this.sheetImage = null;
        this.prevewImage = null;
    }

    private getNormalPostcardImage(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjx'
        + 'zdmcgd2lkdGg9IjEwMG1tIiBoZWlnaHQ9IjE0OG1tIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMDAgM'
        + 'TQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KIDxnIHRyYW5zZm9ybT0idHJhbnNsYXR'
        + 'lKDAsLTE0OSkiPg0KICA8ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiPg0KICAgPGcgc3Ryb2tlLWxpbmVqb'
        + '2luPSJyb3VuZCIgc3Ryb2tlLW9wYWNpdHk9Ii45NzExNSIgc3Ryb2tlLXdpZHRoPSIuNDY1Ij4NCiAgICA8cGF'
        + '0aCBkPSJtNDQuNSAxNjAuOTMgNi40OTggMC4wMzM0LTAuMDE2NjkgOC41MTkyaC02LjQxNDV6Ii8+DQogICAgP'
        + 'HBhdGggZD0ibTUxLjk2OSAxNjAuOTUgNi4xMTItNGUtMyAtMC4wNTAxMSA4LjUwMjUtNi4wNjM3IDAuMDMzNHo'
        + 'iLz4NCiAgICA8cGF0aCBkPSJtNTkuMDMzIDE2MC45OCA1Ljk5NjktMC4wMTY3djguNTUyNmwtNS45OTY5LTAuM'
        + 'DMzNHoiLz4NCiAgICA8cGF0aCBkPSJtNjYuNTE3IDE2MC45MSA2LjA0NyAwLjAzMzQtMC4wMTY2OSA4LjUzNTk'
        + 'tNS45OTY5LTAuMDE2N3oiLz4NCiAgICA8cGF0aCBkPSJtNzMuNTgzIDE2MC45NiA1LjQ2MjMtMC4wMzM0LTAuM'
        + 'DE2NjkgOC41NTI2LTUuNDc5LTAuMDMzNHoiLz4NCiAgICA8cGF0aCBkPSJtODAuMDQ3IDE2MC45MSA2LjAzMDM'
        + 'gMC4wMzM0djguNTAyNWwtNi4wMzAzIDAuMDE2N3oiLz4NCiAgICA8cGF0aCBkPSJtODcuMDggMTYwLjkxaDYuM'
        + 'DEzNmwwLjAzMzQxIDguNTUyNi02LjA4MDQtMC4wMTY3eiIvPg0KICAgPC9nPg0KICAgPGc+DQogICAgPGcgc3R'
        + 'yb2tlLXdpZHRoPSIuMjY0NThweCI+DQogICAgIDxwYXRoIGQ9Im02LjQwMiAyODcuMTVoMTIuMDcybC0wLjAxM'
        + 'TgxIDYuMDEyMi0xMi4wMjQtMC4wMTE4eiIvPg0KICAgICA8cGF0aCBkPSJtMTAuNDUzIDI4Ny4xNyAwLjA0NzI'
        + '1IDUuOTY0OSIvPg0KICAgICA8cGF0aCBkPSJtMTQuNDU4IDI4Ny4xNyAwLjAxMTgxIDUuOTY0OSIvPg0KICAgI'
        + 'CA8cGF0aCBkPSJtMTkuNDU0IDI4Ny4xNWgxNi4wMjl2Ni4wMTIybC0xNi4wMDUgMC4wMTE4eiIvPg0KICAgICA'
        + '8cGF0aCBkPSJtMjMuNDcgMjg3LjIxIDAuMDExODEgNS45Mjk1Ii8+DQogICAgIDxwYXRoIGQ9Im0yNy40ODYgM'
        + 'jg3LjIzIDAuMDM1NDQgNS44OTQxIi8+DQogICAgIDxwYXRoIGQ9Im0zMS40NzggMjg3LjIyIDAuMDQ3MjUgNS4'
        + '5Mjk1Ii8+DQogICAgPC9nPg0KICAgIDxwYXRoIGQ9Im0xMS45NiAxNjAuNDMgMTkuNTUyLTAuMDMzNCAwLjAwO'
        + 'DQgMjIuMS0xOS41NjEtMC4wMTY3eiIgc3Ryb2tlLW9wYWNpdHk9Ii45NTE5MiIgc3Ryb2tlLXdpZHRoPSIuODY'
        + '1Ii8+DQogICA8L2c+DQogIDwvZz4NCiAgPHRleHQgeD0iNDUuMTY4MTU5IiB5PSIxNTYuNTgxODMiIGZpbGw9I'
        + 'iMwMDAwMDAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjIuODIyMnB4IiBsZXR0ZXItc3B'
        + 'hY2luZz0iMHB4IiBzdHJva2Utd2lkdGg9Ii4yNjQ1OCIgd29yZC1zcGFjaW5nPSIwcHgiIHN0eWxlPSJsaW5lL'
        + 'WhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iNDUuMTY4MTU5IiB5PSIxNTYuNTg'
        + 'xODMiIHN0cm9rZS13aWR0aD0iLjI2NDU4Ij7mma7jgIDpgJrjgIDjga/jgIDjgYzjgIDjgY08L3RzcGFuPjwvd'
        + 'GV4dD4NCiAgPHRleHQgeD0iMTUuMzIzNzE5IiB5PSIxNzQuMTc4MTMiIGZpbGw9IiMwMDAwMDAiIGZvbnQtZmF'
        + 'taWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjYuMjM1cHgiIGxldHRlci1zcGFjaW5nPSIwcHgiIHN0cm9rZ'
        + 'S13aWR0aD0iLjU4NDUzIiB3b3JkLXNwYWNpbmc9IjBweCIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDp'
        + 'zcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxNS4zMjM3MTkiIHk9IjE3NC4xNzgxMyIgc3Ryb2tlLXdpZHRoP'
        + 'SIuNTg0NTMiPuWIh+aJizwvdHNwYW4+PC90ZXh0Pg0KICA8cGF0aCBkPSJtOTkuODkyIDE0OS4wN3YxNDcuODd'
        + 'oLTk5Ljc1OGwtMC4wMzM0MDktMTQ3Ljg3eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY'
        + '2l0eT0iLjU2NzMxIiBzdHJva2Utd2lkdGg9Ii4zNjUiLz4NCiA8L2c+DQo8L3N2Zz4NCg=='
    }

    private getNewYearPostcardImage(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjx'
        + 'zdmcgd2lkdGg9IjEwMG1tIiBoZWlnaHQ9IjE0OG1tIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMDAgM'
        + 'TQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KIDxnIHRyYW5zZm9ybT0idHJhbnNsYXR'
        + 'lKDAsLTE0OSkiPg0KICA8ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiPg0KICAgPGcgc3Ryb2tlLWxpbmVqb'
        + '2luPSJyb3VuZCIgc3Ryb2tlLW9wYWNpdHk9Ii45NzExNSIgc3Ryb2tlLXdpZHRoPSIuNDY1Ij4NCiAgICA8cGF'
        + '0aCBkPSJtNDQuNSAxNjAuOTMgNi40OTggMC4wMzM0LTAuMDE2NjkgOC41MTkyaC02LjQxNDV6Ii8+DQogICAgP'
        + 'HBhdGggZD0ibTUxLjk2OSAxNjAuOTUgNi4xMTItNGUtMyAtMC4wNTAxMSA4LjUwMjUtNi4wNjM3IDAuMDMzNHo'
        + 'iLz4NCiAgICA8cGF0aCBkPSJtNTkuMDMzIDE2MC45OCA1Ljk5NjktMC4wMTY3djguNTUyNmwtNS45OTY5LTAuM'
        + 'DMzNHoiLz4NCiAgICA8cGF0aCBkPSJtNjYuNTE3IDE2MC45MSA2LjA0NyAwLjAzMzQtMC4wMTY2OSA4LjUzNTk'
        + 'tNS45OTY5LTAuMDE2N3oiLz4NCiAgICA8cGF0aCBkPSJtNzMuNTgzIDE2MC45NiA1LjQ2MjMtMC4wMzM0LTAuM'
        + 'DE2NjkgOC41NTI2LTUuNDc5LTAuMDMzNHoiLz4NCiAgICA8cGF0aCBkPSJtODAuMDQ3IDE2MC45MSA2LjAzMDM'
        + 'gMC4wMzM0djguNTAyNWwtNi4wMzAzIDAuMDE2N3oiLz4NCiAgICA8cGF0aCBkPSJtODcuMDggMTYwLjkxaDYuM'
        + 'DEzNmwwLjAzMzQxIDguNTUyNi02LjA4MDQtMC4wMTY3eiIvPg0KICAgPC9nPg0KICAgPGc+DQogICAgPGcgc3R'
        + 'yb2tlLXdpZHRoPSIuMjY0NThweCI+DQogICAgIDxwYXRoIGQ9Im02LjQwMiAyNzAuNzRoMTIuMDcybC0wLjAxM'
        + 'TgxIDYuMDEyMi0xMi4wMjQtMC4wMTE4eiIvPg0KICAgICA8cGF0aCBkPSJtMTAuNDUzIDI3MC43NyAwLjA0NzI'
        + '1IDUuOTY0OSIvPg0KICAgICA8cGF0aCBkPSJtMTQuNDU4IDI3MC43NyAwLjAxMTgxIDUuOTY0OSIvPg0KICAgI'
        + 'CA8cGF0aCBkPSJtMTkuNDU0IDI3MC43NGgxNi4wMjl2Ni4wMTIybC0xNi4wMDUgMC4wMTE4eiIvPg0KICAgICA'
        + '8cGF0aCBkPSJtMjMuNDcgMjcwLjggMC4wMTE4MSA1LjkyOTUiLz4NCiAgICAgPHBhdGggZD0ibTI3LjQ4NiAyN'
        + 'zAuODMgMC4wMzU0NCA1Ljg5NDEiLz4NCiAgICAgPHBhdGggZD0ibTMxLjQ3OCAyNzAuODIgMC4wNDcyNSA1Ljk'
        + 'yOTUiLz4NCiAgICA8L2c+DQogICAgPHBhdGggZD0ibTkuODQzNiAxNTYuNzIgMTkuNTUyLTAuMDMzNCAwLjAwO'
        + 'DQgMjIuMS0xOS41NjEtMC4wMTY3eiIgc3Ryb2tlLW9wYWNpdHk9Ii45NTE5MiIgc3Ryb2tlLXdpZHRoPSIuODY'
        + '1Ii8+DQogICA8L2c+DQogIDwvZz4NCiAgPHRleHQgeD0iNDUuMTY4MTU5IiB5PSIxNTYuNTgxODMiIGZpbGw9I'
        + 'iMwMDAwMDAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjIuODIyMnB4IiBsZXR0ZXItc3B'
        + 'hY2luZz0iMHB4IiBzdHJva2Utd2lkdGg9Ii4yNjQ1OCIgd29yZC1zcGFjaW5nPSIwcHgiIHN0eWxlPSJsaW5lL'
        + 'WhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iNDUuMTY4MTU5IiB5PSIxNTYuNTg'
        + 'xODMiIHN0cm9rZS13aWR0aD0iLjI2NDU4Ij7lubTjgIDos4DjgIDjga/jgIDjgYzjgIDjgY08L3RzcGFuPjwvd'
        + 'GV4dD4NCiAgPHRleHQgeD0iMTMuMjA3MDU0IiB5PSIxNzAuNDc0MDEiIGZpbGw9IiMwMDAwMDAiIGZvbnQtZmF'
        + 'taWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjYuMjM1cHgiIGxldHRlci1zcGFjaW5nPSIwcHgiIHN0cm9rZ'
        + 'S13aWR0aD0iLjU4NDUzIiB3b3JkLXNwYWNpbmc9IjBweCIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDp'
        + 'zcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxMy4yMDcwNTQiIHk9IjE3MC40NzQwMSIgc3Ryb2tlLXdpZHRoP'
        + 'SIuNTg0NTMiPuWIh+aJizwvdHNwYW4+PC90ZXh0Pg0KICA8cGF0aCBkPSJtOTkuODkyIDE0OS4wN3YxNDcuODd'
        + 'oLTk5Ljc1OGwtMC4wMzM0MDktMTQ3Ljg3eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY'
        + '2l0eT0iLjU2NzMxIiBzdHJva2Utd2lkdGg9Ii4zNjUiLz4NCiA8L2c+DQo8L3N2Zz4NCg==';
    }
}


