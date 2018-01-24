/**
 * レイアウトファイル　志望動機、自己PR、広め、特技欄あり
 */

import { Injectable } from '@angular/core';

@Injectable()
export class RecruiteLayoutType2Service {

    private image: String = '';
    private  Layout1: String = '';
    private  Layout2: String = '';

    constructor() {
    }
    setLayoutImage1(layout: string): void {
        this.Layout1 = layout;
    }
    setLayoutImage2(layout: string): void {
        this.Layout1 = layout;
    }
    makeRecruiteLayout(content): any {
        const docDefinition = {
            content: [
                {
                    image: this.Layout1,
                    width: 595,
                    height: 842,
                    margin: [0, 0, 0, 0]
                },
                {
                    width: 100,
                    image: this.image,
                    margin: [430, 0, 0, 5],
                    pageBreake: 'after'
                },
                {
                    image: this.getLayoutPage2(),
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


    getLayoutPage2(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjx'
        + 'zdmcgd2lkdGg9IjIxMG1tIiBoZWlnaHQ9IjI5N21tIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMTAgM'
        + 'jk3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0'
        + 'iIzAwMCI+DQogIDxwYXRoIGQ9Im0xMi4yNDIgMjIuMzkyIDE4NS42Ny0wLjA1MzcyIDAuMDQ3MiAyNTkuMzQtM'
        + 'Tg1Ljc5LTAuMDY2OHoiIHN0cm9rZS13aWR0aD0iLjU2NSIvPg0KICA8ZyBzdHJva2Utd2lkdGg9Ii4yNjQ1OHB'
        + '4Ij4NCiAgIDxwYXRoIGQ9Im0xMi4yNDcgMjkuNjIxIDE4NS42OSAwLjA0NTg1NyIvPg0KICAgPHBhdGggZD0ib'
        + 'TEyLjI5NCAzOS43NjFoMTg1LjU1Ii8+DQogICA8cGF0aCBkPSJtMTIuMzQyIDUwLjAxMiAxODUuNDctMC4wOTU'
        + '4ODQiLz4NCiAgIDxwYXRoIGQ9Im0xMi4yOTYgNTkuNDMgMTg1LjUxLTAuMDQ4NjQiLz4NCiAgIDxwYXRoIGQ9I'
        + 'm0xMi40MiA2OC43NjggMTg1LjU1LTAuMDMyNDI2Ii8+DQogICA8cGF0aCBkPSJtMTIuMzQyIDc4LjE3aDE4NS4'
        + '2Ii8+DQogICA8cGF0aCBkPSJtMTIuNTYyIDg3LjcyOCAxODUuMzYgMC4xMTIxIi8+DQogICA8cGF0aCBkPSJtM'
        + 'zMuMzMgMjIuNTMgMC4wMTYyMSA2NS4xMzUiLz4NCiAgIDxwYXRoIGQ9Im00OS4xNjEgMjIuMjQ3IDAuMTI2OTI'
        + 'gNjUuNDE4Ii8+DQogICA8cGF0aCBkPSJtMTIuMjk0IDEzNy4xN2gxODUuNjYiLz4NCiAgIDxwYXRoIGQ9Im0xM'
        + 'i4yOTQgMTg2LjYyIDE4NS42MiAwLjI2NzI3Ii8+DQogICA8cGF0aCBkPSJtMTIuMjI4IDIyNy43OCAxODUuNjk'
        + 'tMC4wNjY4Ii8+DQogICA8cGF0aCBkPSJtMTIuMjI4IDI1MC4yOSAxODUuNTUtMC4wNjY4Ii8+DQogICA8cGF0a'
        + 'CBkPSJtMTA0Ljc3IDE4Ni42OCAwLjA2NjggNjMuNDEiLz4NCiAgIDxwYXRoIGQ9Im01OC42NjYgMjI3LjkxIDA'
        + 'uMDY2ODIgMjIuMzE3Ii8+DQogICA8cGF0aCBkPSJtMTUxLjU0IDIyNy43MS0wLjEzMzY1IDIyLjUxNyIvPg0KI'
        + 'CA8L2c+DQogPC9nPg0KIDxnIGZpbGw9IiMwMDAwMDAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBsZXR0ZXI'
        + 'tc3BhY2luZz0iMHB4IiB3b3JkLXNwYWNpbmc9IjBweCI+DQogIDx0ZXh0IHg9IjIxLjIyODczMSIgeT0iMjcuN'
        + 'TE4ODY3IiBmb250LXNpemU9IjMuMzgxMnB4IiBzdHJva2Utd2lkdGg9Ii4wODQ1MjkiIHN0eWxlPSJsaW5lLWh'
        + 'laWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMjEuMjI4NzMxIiB5PSIyNy41MTg4N'
        + 'jciIHN0cm9rZS13aWR0aD0iLjA4NDUyOSI+5bm0PC90c3Bhbj48L3RleHQ+DQogIDx0ZXh0IHg9IjM5LjYxMjQ'
        + 'yNyIgeT0iMjcuNDE2ODk1IiBmb250LXNpemU9IjMuMTI3NHB4IiBzdHJva2Utd2lkdGg9Ii4wNzgxODQiIHN0e'
        + 'WxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMzkuNjEyNDI3IiB'
        + '5PSIyNy40MTY4OTUiIHN0cm9rZS13aWR0aD0iLjA3ODE4NCI+5pyIPC90c3Bhbj48L3RleHQ+DQogIDx0ZXh0I'
        + 'Hg9IjExNC4xNDE4NiIgeT0iMjcuNTEzODQ1IiBmb250LXNpemU9IjMuNTM1N3B4IiBzdHJva2Utd2lkdGg9Ii4'
        + 'wODgzOTIiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iM'
        + 'TE0LjE0MTg2IiB5PSIyNy41MTM4NDUiIHN0cm9rZS13aWR0aD0iLjA4ODM5MiI+5YWN6Kix44O76LOH5qC8PC9'
        + '0c3Bhbj48L3RleHQ+DQogIDx0ZXh0IHg9IjEzLjkyMzczIiB5PSI5My43NDI0NzciIGZvbnQtc2l6ZT0iMy41N'
        + 'DJweCIgc3Ryb2tlLXdpZHRoPSIuMDg4NTUiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InB'
        + 'yZXNlcnZlIj48dHNwYW4geD0iMTMuOTIzNzMiIHk9IjkzLjc0MjQ3NyIgc3Ryb2tlLXdpZHRoPSIuMDg4NTUiP'
        + 'uW/l+acm+WLleapnzwvdHNwYW4+PC90ZXh0Pg0KICA8dGV4dCB4PSIxMy44NjQ1NDUiIHk9IjE0MS40MzM2OSI'
        + 'gZm9udC1zaXplPSIzLjc1MjVweCIgc3Ryb2tlLXdpZHRoPSIuMDkzODEyIiBzdHlsZT0ibGluZS1oZWlnaHQ6M'
        + 'S4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjEzLjg2NDU0NSIgeT0iMTQxLjQzMzY5IiBzdHJ'
        + 'va2Utd2lkdGg9Ii4wOTM4MTIiPuiHquW3sVBSPC90c3Bhbj48L3RleHQ+DQogIDx0ZXh0IHg9IjEzLjk5ODAyM'
        + 'SIgeT0iMTkwLjQ5ODMxIiBmb250LXNpemU9IjMuNjMwMXB4IiBzdHJva2Utd2lkdGg9Ii4wOTA3NTMiIHN0eWx'
        + 'lPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMTMuOTk4MDIxIiB5P'
        + 'SIxOTAuNDk4MzEiIHN0cm9rZS13aWR0aD0iLjA5MDc1MyI+6Laj5ZGzPC90c3Bhbj48L3RleHQ+DQogIDx0ZXh'
        + '0IHg9IjEwNi40ODE4NiIgeT0iMTkxLjE3NDk3IiBmb250LXNpemU9IjMuNjM2NXB4IiBzdHJva2Utd2lkdGg9I'
        + 'i4wOTA5MTMiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0'
        + 'iMTA2LjQ4MTg2IiB5PSIxOTEuMTc0OTciIHN0cm9rZS13aWR0aD0iLjA5MDkxMyI+54m55oqAPC90c3Bhbj48L'
        + '3RleHQ+DQogIDx0ZXh0IHg9IjEzLjQ2ODg1MSIgeT0iMjMxLjc5OTMiIGZvbnQtc2l6ZT0iMy4yNDUxcHgiIHN'
        + '0cm9rZS13aWR0aD0iLjA4MTEyNyIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2Vyd'
        + 'mUiPjx0c3BhbiB4PSIxMy40Njg4NTEiIHk9IjIzMS43OTkzIiBzdHJva2Utd2lkdGg9Ii4wODExMjciPumAmuW'
        + 'LpOaZgumWkzwvdHNwYW4+PC90ZXh0Pg0KICA8dGV4dCB4PSI2MC40NzM2NzkiIHk9IjIzMS43ODY0MSIgZm9ud'
        + 'C1zaXplPSIzLjAzNDZweCIgc3Ryb2tlLXdpZHRoPSIuMDc1ODY1IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSI'
        + 'geG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjYwLjQ3MzY3OSIgeT0iMjMxLjc4NjQxIiBzdHJva2Utd'
        + '2lkdGg9Ii4wNzU4NjUiPuaJtumkiuWutuaXjzwvdHNwYW4+PC90ZXh0Pg0KICA8dGV4dCB4PSIxMDYuODQ5NjI'
        + 'iIHk9IjIzMS41OTYxNiIgZm9udC1zaXplPSIzLjAxMjVweCIgc3Ryb2tlLXdpZHRoPSIuMDc1MzEyIiBzdHlsZ'
        + 'T0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjEwNi44NDk2MiIgeT0'
        + 'iMjMxLjU5NjE2IiBzdHJva2Utd2lkdGg9Ii4wNzUzMTIiPumFjeWBtuiAheOBruacieeEoTwvdHNwYW4+PC90Z'
        + 'Xh0Pg0KICA8dGV4dCB4PSIxMy45NDQyMDEiIHk9IjI0NS4yMzI1OSIgZm9udC1zaXplPSIzLjQ2MTNweCIgc3R'
        + 'yb2tlLXdpZHRoPSIuMDg2NTMyIiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2Z'
        + 'SI+PHRzcGFuIHg9IjEzLjk0NDIwMSIgeT0iMjQ1LjIzMjU5IiBzdHJva2Utd2lkdGg9Ii4wODY1MzIiPue0hDw'
        + 'vdHNwYW4+PC90ZXh0Pg0KICA8dGV4dCB4PSI0OC4wOTgyNzgiIHk9IjI0NS4zNTI4MSIgZm9udC1zaXplPSIzL'
        + 'jIwOTFweCIgc3Ryb2tlLXdpZHRoPSIuMDgwMjI3IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWN'
        + 'lPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjQ4LjA5ODI3OCIgeT0iMjQ1LjM1MjgxIiBzdHJva2Utd2lkdGg9Ii4wO'
        + 'DAyMjciPuWIhjwvdHNwYW4+PC90ZXh0Pg0KICA8dGV4dCB4PSI2NS41MTMyNjgiIHk9IjI0NS42ODkxMyIgZm9'
        + 'udC1zaXplPSI0LjI5NjFweCIgc3Ryb2tlLXdpZHRoPSIuMTA3NCIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiI'
        + 'HhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSI2NS41MTMyNjgiIHk9IjI0NS42ODkxMyIgc3Ryb2tlLXd'
        + 'pZHRoPSIuMTA3NCI+4oC744CA5pyJ44CA44O744CA54ShPC90c3Bhbj48L3RleHQ+DQogIDx0ZXh0IHg9IjEzL'
        + 'jg5OTI3MiIgeT0iMjU0LjI0ODY0IiBmb250LXNpemU9IjguNDM2MnB4IiBzdHJva2Utd2lkdGg9Ii4yMTA5MSI'
        + 'gc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxMy44OTkyN'
        + 'zIiIHk9IjI1NC4yNDg2NCIgZm9udC1zaXplPSIzLjM3NDVweCIgc3Ryb2tlLXdpZHRoPSIuMjEwOTEiPuacrOS'
        + '6uuW4jOacm+iomOWFpeashO+8iOeJueOBq+e1puaWmeODu+iBt+eoruODu+WLpOWLmeaZgumWk+ODu+WLpOWLm'
        + 'eWcsOODu+OBneOBruS7luOBq+OBpOOBhOOBpuOBruW4jOacm+OBquOBqeOBjOOBguOCjOOBsOiomOWFpe+8iTw'
        + 'vdHNwYW4+PC90ZXh0Pg0KICA8dGV4dCB4PSIxMTIuMjYyOTYiIHk9IjI0NS41NjU0OCIgZm9udC1zaXplPSI0L'
        + 'jEzMDFweCIgc3Ryb2tlLXdpZHRoPSIuMTAzMjUiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U'
        + '9InByZXNlcnZlIj48dHNwYW4geD0iMTEyLjI2Mjk2IiB5PSIyNDUuNTY1NDgiIHN0cm9rZS13aWR0aD0iLjEwM'
        + 'zI1Ij7igLvjgIDmnInjgIDjg7vjgIDnhKE8L3RzcGFuPjwvdGV4dD4NCiAgPHRleHQgeD0iMTU4LjA2MjUzIiB'
        + '5PSIyNDUuNTIwODYiIGZvbnQtc2l6ZT0iNC4yOTYxcHgiIHN0cm9rZS13aWR0aD0iLjEwNzQiIHN0eWxlPSJsa'
        + 'W5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMTU4LjA2MjUzIiB5PSIyNDU'
        + 'uNTIwODYiIHN0cm9rZS13aWR0aD0iLjEwNzQiPuKAu+OAgOacieOAgOODu+OAgOeEoTwvdHNwYW4+PC90ZXh0P'
        + 'g0KICA8dGV4dCB4PSIxNTMuMTE4OTMiIHk9IjIzMS43NjQ4NiIgZm9udC1zaXplPSIzLjAwNTlweCIgc3Ryb2t'
        + 'lLXdpZHRoPSIuMDc1MTQ4IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+P'
        + 'HRzcGFuIHg9IjE1My4xMTg5MyIgeT0iMjMxLjc2NDg2IiBzdHJva2Utd2lkdGg9Ii4wNzUxNDgiPumFjeWBtui'
        + 'AheOBruaJtumkiue+qeWLmTwvdHNwYW4+PC90ZXh0Pg0KIDwvZz4NCjwvc3ZnPg0K';
    }
}
