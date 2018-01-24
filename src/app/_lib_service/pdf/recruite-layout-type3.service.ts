/**
 * レイアウトファイル　志望動機、自己PR、広め、健康状態あり
 */

import { Injectable } from '@angular/core';

@Injectable()
export class RecruiteLayoutType3Service {

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
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjIxMG1tIiB'
    + 'oZWlnaHQ9IjI5N21tIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMTAgMjk3IiB4bWxucz0iaHR0cDovL3d'
    + '3dy53My5vcmcvMjAwMC9zdmciPg0KIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCI+DQogIDxwYXRoIGQ9Im0'
    + 'xMi4yNDIgMjIuMzkyIDE4NS42Ny0wLjA1MzcyIDAuMDQ3MiAyNTkuMzQtMTg1Ljc5LTAuMDY2OHoiIHN0cm9rZS1'
    + '3aWR0aD0iLjU2NSIvPg0KICA8ZyBzdHJva2Utd2lkdGg9Ii4yNjQ1OHB4Ij4NCiAgIDxwYXRoIGQ9Im0xMi4yNDc'
    + 'gMjkuNjIxIDE4NS42OSAwLjA0NTg1NyIvPg0KICAgPHBhdGggZD0ibTEyLjI5NCAzOS43NjFoMTg1LjU1Ii8+DQo'
    + 'gICA8cGF0aCBkPSJtMTIuMzQyIDUwLjAxMiAxODUuNDctMC4wOTU4ODQiLz4NCiAgIDxwYXRoIGQ9Im0xMi4yOTY'
    + 'gNTkuNDMgMTg1LjUxLTAuMDQ4NjQiLz4NCiAgIDxwYXRoIGQ9Im0xMi40MiA2OC43NjggMTg1LjU1LTAuMDMyNDI'
    + '2Ii8+DQogICA8cGF0aCBkPSJtMTIuMzQyIDc4LjE3aDE4NS42Ii8+DQogICA8cGF0aCBkPSJtMTIuNTYyIDg3Ljc'
    + 'yOCAxODUuMzYgMC4xMTIxIi8+DQogICA8cGF0aCBkPSJtMzMuMzMgMjIuNTMgMC4wMTYyMSA2NS4xMzUiLz4NCiA'
    + 'gIDxwYXRoIGQ9Im00OS4xNjEgMjIuMjQ3IDAuMTI2OTIgNjUuNDE4Ii8+DQogICA8cGF0aCBkPSJtMTIuMjk0IDE'
    + 'zNy4xN2gxODUuNjYiLz4NCiAgIDxwYXRoIGQ9Im0xMi4yOTQgMTg2LjYyIDE4NS42MiAwLjI2NzI3Ii8+DQogICA'
    + '8cGF0aCBkPSJtMTIuMjI4IDIyNy43OCAxODUuNjktMC4wNjY4Ii8+DQogICA8cGF0aCBkPSJtMTIuMjI4IDI1MC4'
    + 'yOSAxODUuNTUtMC4wNjY4Ii8+DQogICA8cGF0aCBkPSJtMTA0Ljc3IDE4Ni42OCAwLjA2NjggNjMuNDEiLz4NCiA'
    + 'gIDxwYXRoIGQ9Im01OC42NjYgMjI3LjkxIDAuMDY2ODIgMjIuMzE3Ii8+DQogICA8cGF0aCBkPSJtMTUxLjU0IDI'
    + 'yNy43MS0wLjEzMzY1IDIyLjUxNyIvPg0KICA8L2c+DQogPC9nPg0KIDxnIGZpbGw9IiMwMDAwMDAiIGZvbnQtZmF'
    + 'taWx5PSJzYW5zLXNlcmlmIiBsZXR0ZXItc3BhY2luZz0iMHB4IiB3b3JkLXNwYWNpbmc9IjBweCI+DQogIDx0ZXh'
    + '0IHg9IjIxLjIyODczMSIgeT0iMjcuNTE4ODY3IiBmb250LXNpemU9IjMuMzgxMnB4IiBzdHJva2Utd2lkdGg9Ii4'
    + 'wODQ1MjkiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMjE'
    + 'uMjI4NzMxIiB5PSIyNy41MTg4NjciIHN0cm9rZS13aWR0aD0iLjA4NDUyOSI+5bm0PC90c3Bhbj48L3RleHQ+DQo'
    + 'gIDx0ZXh0IHg9IjM5LjYxMjQyNyIgeT0iMjcuNDE2ODk1IiBmb250LXNpemU9IjMuMTI3NHB4IiBzdHJva2Utd2l'
    + 'kdGg9Ii4wNzgxODQiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4'
    + 'geD0iMzkuNjEyNDI3IiB5PSIyNy40MTY4OTUiIHN0cm9rZS13aWR0aD0iLjA3ODE4NCI+5pyIPC90c3Bhbj48L3R'
    + 'leHQ+DQogIDx0ZXh0IHg9IjExNC4xNDE4NiIgeT0iMjcuNTEzODQ1IiBmb250LXNpemU9IjMuNTM1N3B4IiBzdHJ'
    + 'va2Utd2lkdGg9Ii4wODgzOTIiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj4'
    + '8dHNwYW4geD0iMTE0LjE0MTg2IiB5PSIyNy41MTM4NDUiIHN0cm9rZS13aWR0aD0iLjA4ODM5MiI+5YWN6Kix44O'
    + '76LOH5qC8PC90c3Bhbj48L3RleHQ+DQogIDx0ZXh0IHg9IjEzLjkyMzczIiB5PSI5My43NDI0NzciIGZvbnQtc2l'
    + '6ZT0iMy41NDJweCIgc3Ryb2tlLXdpZHRoPSIuMDg4NTUiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3B'
    + 'hY2U9InByZXNlcnZlIj48dHNwYW4geD0iMTMuOTIzNzMiIHk9IjkzLjc0MjQ3NyIgc3Ryb2tlLXdpZHRoPSIuMDg'
    + '4NTUiPuW/l+acm+WLleapnzwvdHNwYW4+PC90ZXh0Pg0KICA8dGV4dCB4PSIxMy44NjQ1NDUiIHk9IjE0MS40MzM'
    + '2OSIgZm9udC1zaXplPSIzLjc1MjVweCIgc3Ryb2tlLXdpZHRoPSIuMDkzODEyIiBzdHlsZT0ibGluZS1oZWlnaHQ'
    + '6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjEzLjg2NDU0NSIgeT0iMTQxLjQzMzY5IiBzdHJ'
    + 'va2Utd2lkdGg9Ii4wOTM4MTIiPuiHquW3sVBSPC90c3Bhbj48L3RleHQ+DQogIDx0ZXh0IHg9IjEzLjk5ODAyMSI'
    + 'geT0iMTkwLjQ5ODMxIiBmb250LXNpemU9IjMuNjMwMXB4IiBzdHJva2Utd2lkdGg9Ii4wOTA3NTMiIHN0eWxlPSJ'
    + 'saW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMTMuOTk4MDIxIiB5PSIxOTA'
    + 'uNDk4MzEiIHN0cm9rZS13aWR0aD0iLjA5MDc1MyI+6ZW35omA44O755+t5omAPC90c3Bhbj48L3RleHQ+DQogIDx'
    + '0ZXh0IHg9IjEwNi40ODE4NiIgeT0iMTkxLjE3NDk3IiBmb250LXNpemU9IjMuNjM2NXB4IiBzdHJva2Utd2lkdGg'
    + '9Ii4wOTA5MTMiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0'
    + 'iMTA2LjQ4MTg2IiB5PSIxOTEuMTc0OTciIHN0cm9rZS13aWR0aD0iLjA5MDkxMyI+5YGl5bq354q25oWLPC90c3B'
    + 'hbj48L3RleHQ+DQogIDx0ZXh0IHg9IjEzLjQ2ODg1MSIgeT0iMjMxLjc5OTMiIGZvbnQtc2l6ZT0iMy4yNDUxcHg'
    + 'iIHN0cm9rZS13aWR0aD0iLjA4MTEyNyIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2V'
    + 'ydmUiPjx0c3BhbiB4PSIxMy40Njg4NTEiIHk9IjIzMS43OTkzIiBzdHJva2Utd2lkdGg9Ii4wODExMjciPumAmuW'
    + 'LpOaZgumWkzwvdHNwYW4+PC90ZXh0Pg0KICA8dGV4dCB4PSI2MC40NzM2NzkiIHk9IjIzMS43ODY0MSIgZm9udC1'
    + 'zaXplPSIzLjAzNDZweCIgc3Ryb2tlLXdpZHRoPSIuMDc1ODY1IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1'
    + 'sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjYwLjQ3MzY3OSIgeT0iMjMxLjc4NjQxIiBzdHJva2Utd2lkdGg'
    + '9Ii4wNzU4NjUiPuaJtumkiuWutuaXjzwvdHNwYW4+PC90ZXh0Pg0KICA8dGV4dCB4PSIxMDYuODQ5NjIiIHk9IjI'
    + 'zMS41OTYxNiIgZm9udC1zaXplPSIzLjAxMjVweCIgc3Ryb2tlLXdpZHRoPSIuMDc1MzEyIiBzdHlsZT0ibGluZS1'
    + 'oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjEwNi44NDk2MiIgeT0iMjMxLjU5NjE'
    + '2IiBzdHJva2Utd2lkdGg9Ii4wNzUzMTIiPumFjeWBtuiAheOBruacieeEoTwvdHNwYW4+PC90ZXh0Pg0KICA8dGV'
    + '4dCB4PSIxMy45NDQyMDEiIHk9IjI0NS4yMzI1OSIgZm9udC1zaXplPSIzLjQ2MTNweCIgc3Ryb2tlLXdpZHRoPSI'
    + 'uMDg2NTMyIiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjE'
    + 'zLjk0NDIwMSIgeT0iMjQ1LjIzMjU5IiBzdHJva2Utd2lkdGg9Ii4wODY1MzIiPue0hDwvdHNwYW4+PC90ZXh0Pg0'
    + 'KICA8dGV4dCB4PSI0OC4wOTgyNzgiIHk9IjI0NS4zNTI4MSIgZm9udC1zaXplPSIzLjIwOTFweCIgc3Ryb2tlLXd'
    + 'pZHRoPSIuMDgwMjI3IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGF'
    + 'uIHg9IjQ4LjA5ODI3OCIgeT0iMjQ1LjM1MjgxIiBzdHJva2Utd2lkdGg9Ii4wODAyMjciPuWIhjwvdHNwYW4+PC9'
    + '0ZXh0Pg0KICA8dGV4dCB4PSI2NS41MTMyNjgiIHk9IjI0NS42ODkxMyIgZm9udC1zaXplPSI0LjI5NjFweCIgc3R'
    + 'yb2tlLXdpZHRoPSIuMTA3NCIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx'
    + '0c3BhbiB4PSI2NS41MTMyNjgiIHk9IjI0NS42ODkxMyIgc3Ryb2tlLXdpZHRoPSIuMTA3NCI+4oC744CA5pyJ44C'
    + 'A44O744CA54ShPC90c3Bhbj48L3RleHQ+DQogIDx0ZXh0IHg9IjEzLjg5OTI3MiIgeT0iMjU0LjI0ODY0IiBmb25'
    + '0LXNpemU9IjguNDM2MnB4IiBzdHJva2Utd2lkdGg9Ii4yMTA5MSIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHh'
    + 'tbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxMy44OTkyNzIiIHk9IjI1NC4yNDg2NCIgZm9udC1zaXplPSI'
    + 'zLjM3NDVweCIgc3Ryb2tlLXdpZHRoPSIuMjEwOTEiPuacrOS6uuW4jOacm+iomOWFpeashO+8iOeJueOBq+e1pua'
    + 'WmeODu+iBt+eoruODu+WLpOWLmeaZgumWk+ODu+WLpOWLmeWcsOODu+OBneOBruS7luOBq+OBpOOBhOOBpuOBruW'
    + '4jOacm+OBquOBqeOBjOOBguOCjOOBsOiomOWFpe+8iTwvdHNwYW4+PC90ZXh0Pg0KICA8dGV4dCB4PSIxMTIuMjY'
    + 'yOTYiIHk9IjI0NS41NjU0OCIgZm9udC1zaXplPSI0LjEzMDFweCIgc3Ryb2tlLXdpZHRoPSIuMTAzMjUiIHN0eWx'
    + 'lPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMTEyLjI2Mjk2IiB5PSI'
    + 'yNDUuNTY1NDgiIHN0cm9rZS13aWR0aD0iLjEwMzI1Ij7igLvjgIDmnInjgIDjg7vjgIDnhKE8L3RzcGFuPjwvdGV'
    + '4dD4NCiAgPHRleHQgeD0iMTU4LjA2MjUzIiB5PSIyNDUuNTIwODYiIGZvbnQtc2l6ZT0iNC4yOTYxcHgiIHN0cm9'
    + 'rZS13aWR0aD0iLjEwNzQiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHN'
    + 'wYW4geD0iMTU4LjA2MjUzIiB5PSIyNDUuNTIwODYiIHN0cm9rZS13aWR0aD0iLjEwNzQiPuKAu+OAgOacieOAgOO'
    + 'Du+OAgOeEoTwvdHNwYW4+PC90ZXh0Pg0KICA8dGV4dCB4PSIxNTMuMTE4OTMiIHk9IjIzMS43NjQ4NiIgZm9udC1'
    + 'zaXplPSIzLjAwNTlweCIgc3Ryb2tlLXdpZHRoPSIuMDc1MTQ4IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1'
    + 'sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjE1My4xMTg5MyIgeT0iMjMxLjc2NDg2IiBzdHJva2Utd2lkdGg'
    + '9Ii4wNzUxNDgiPumFjeWBtuiAheOBruaJtumkiue+qeWLmTwvdHNwYW4+PC90ZXh0Pg0KIDwvZz4NCjwvc3ZnPg0K';
    }
}
