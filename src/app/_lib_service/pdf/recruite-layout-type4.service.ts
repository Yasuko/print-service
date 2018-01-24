/**
 * レイアウトファイル　経歴に自信がない人向け
 */

import { Injectable } from '@angular/core';

@Injectable()
export class RecruiteLayoutType4Service {

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
    setImage(url: String): void {
        this.image = url;
    }
    makeRecruiteLayout(): any {
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
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjIxMG1tI'
  + 'iBoZWlnaHQ9IjI5N21tIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMTAgMjk3IiB4bWxucz0iaHR0cDovL'
  + '3d3dy53My5vcmcvMjAwMC9zdmciPg0KIDxnPg0KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtLjE0NjQgLTEuM'
  + 'DM5NCkiPg0KICAgPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIj4NCiAgICA8cGF0aCBkPSJtMTIuMjQyIDIyL'
  + 'jM5MiAxODUuNjctMC4wNTM3MiAwLjA0NzIgMjU5LjM0LTE4NS43OS0wLjA2Njh6IiBzdHJva2Utd2lkdGg9Ii41NjU'
  + 'iLz4NCiAgICA8ZyBzdHJva2Utd2lkdGg9Ii4yNjQ1OHB4Ij4NCiAgICAgPHBhdGggZD0ibTEyLjI0NyAyOS42MjE'
  + 'gMTg1LjY5IDAuMDQ1ODU3Ii8+DQogICAgIDxwYXRoIGQ9Im0xMi4yOTQgMzkuNzYxaDE4NS41NSIvPg0KICAgICA'
  + '8cGF0aCBkPSJtMTIuMzQyIDUwLjAxMiAxODUuNDctMC4wOTU4ODQiLz4NCiAgICAgPHBhdGggZD0ibTEyLjI5NiA1O'
  + 'S40MyAxODUuNTEtMC4wNDg2NCIvPg0KICAgICA8cGF0aCBkPSJtMTIuNDIgNjguNzY4IDE4NS41NS0wLjAzMjQyN'
  + 'iIvPg0KICAgICA8cGF0aCBkPSJtMTIuMzQyIDc4LjE3aDE4NS42Ii8+DQogICAgIDxwYXRoIGQ9Im0xMi4zNzMgM'
  + 'TAxLjM4IDE4NS40Ni0wLjAyOTYiLz4NCiAgICAgPHBhdGggZD0ibTM1LjY5MyAyMi42NzIgMC4xMTA3IDU1LjQwMyI'
  + 'vPg0KICAgICA8cGF0aCBkPSJtNTEuNTI0IDIyLjI5NCAwLjAzMjQzIDU1LjgyNiIvPg0KICAgICA8cGF0aCBkPSJ'
  + 'tMTIuMTA1IDEzNS4wOSAxODUuNzUgMC4xODg5OSIvPg0KICAgICA8cGF0aCBkPSJtMTIuMTA1IDE2OS42MSAxODU'
  + 'uODEgMC4yNjcyNyIvPg0KICAgICA8cGF0aCBkPSJtMTIuMTggMjM5LjQ1IDE4NS43My0wLjAxOTYiLz4NCiAgICAgP'
  + 'HBhdGggZD0ibTEyLjIyOCAyNTcuODUgMTg1LjgxLTAuMDMzNCIvPg0KICAgICA8cGF0aCBkPSJtMTA1LjAxIDIzO'
  + 'S40MS0wLjAyNzcgMTguMzM2Ii8+DQogICAgIDxwYXRoIGQ9Im01OC42NjYgMjM5LjQyIDAuMDMzNDEgMTguNDA4I'
  + 'i8+DQogICAgIDxwYXRoIGQ9Im0xNTEuMTYgMjM5LjQzIDAuMDU1MyAxOC41NDkiLz4NCiAgICAgPHBhdGggZD0ibTE'
  + 'yLjA5NSAyMDYuNjYgMTg1Ljg3IDAuMDk0NSIvPg0KICAgICA8cGF0aCBkPSJtMTA2Ljk3IDEwMS4yNnY2OC4zNjY'
  + 'iLz4NCiAgICA8L2c+DQogICA8L2c+DQogICA8ZyBmaWxsPSIjMDAwMDAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJ'
  + 'pZiIgbGV0dGVyLXNwYWNpbmc9IjBweCIgd29yZC1zcGFjaW5nPSIwcHgiPg0KICAgIDx0ZXh0IHg9IjIxLjg5MDE5I'
  + 'iB5PSIyNy42MTMzNjEiIGZvbnQtc2l6ZT0iMy4zODEycHgiIHN0cm9rZS13aWR0aD0iLjA4NDUyOSIgc3R5bGU9I'
  + 'mxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIyMS44OTAxOSIgeT0iMjcuN'
  + 'jEzMzYxIiBzdHJva2Utd2lkdGg9Ii4wODQ1MjkiPuW5tDwvdHNwYW4+PC90ZXh0Pg0KICAgIDx0ZXh0IHg9IjQxLjk'
  + '3NDc3NyIgeT0iMjcuNDE2ODk1IiBmb250LXNpemU9IjMuMTI3NHB4IiBzdHJva2Utd2lkdGg9Ii4wNzgxODQiIHN'
  + '0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iNDEuOTc0Nzc3IiB'
  + '5PSIyNy40MTY4OTUiIHN0cm9rZS13aWR0aD0iLjA3ODE4NCI+5pyIPC90c3Bhbj48L3RleHQ+DQogICAgPHRleHQge'
  + 'D0iMTE1Ljg0Mjc1IiB5PSIyNy40MTkzNTIiIGZvbnQtc2l6ZT0iMy41MzU3cHgiIHN0cm9rZS13aWR0aD0iLjA4O'
  + 'DM5MiIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxMTUuO'
  + 'DQyNzUiIHk9IjI3LjQxOTM1MiIgc3Ryb2tlLXdpZHRoPSIuMDg4MzkyIj7lhY3oqLHjg7vos4fmoLw8L3RzcGFuPjw'
  + 'vdGV4dD4NCiAgICA8dGV4dCB4PSIxMy45MjM3MyIgeT0iMTc2LjMzMDI4IiBmb250LXNpemU9IjMuNTQycHgiIHN'
  + '0cm9rZS13aWR0aD0iLjA4ODU1IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI'
  + '+PHRzcGFuIHg9IjEzLjkyMzczIiB5PSIxNzYuMzMwMjgiIHN0cm9rZS13aWR0aD0iLjA4ODU1Ij7lv5fmnJvli5Xmq'
  + 'Z88L3RzcGFuPjwvdGV4dD4NCiAgICA8dGV4dCB4PSIxMy40ODY1NjgiIHk9IjIxMS4zNTkyOCIgZm9udC1zaXplP'
  + 'SIzLjc1MjVweCIgc3Ryb2tlLXdpZHRoPSIuMDkzODEyIiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwY'
  + 'WNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjEzLjQ4NjU2OCIgeT0iMjExLjM1OTI4IiBzdHJva2Utd2lkdGg9Ii4wOTM'
  + '4MTIiPuiHquW3sVBSPC90c3Bhbj48L3RleHQ+DQogICAgPHRleHQgeD0iMTMuODA5MDMzIiB5PSIxNDAuMDM4NDg'
  + 'iIGZvbnQtc2l6ZT0iMy42MzAxcHgiIHN0cm9rZS13aWR0aD0iLjA5MDc1MyIgc3R5bGU9ImxpbmUtaGVpZ2h0OjE'
  + 'uMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxMy44MDkwMzMiIHk9IjE0MC4wMzg0OCIgc3Ryb2tlL'
  + 'XdpZHRoPSIuMDkwNzUzIj7plbfmiYDjg7vnn63miYA8L3RzcGFuPjwvdGV4dD4NCiAgICA8dGV4dCB4PSIxMDkuM'
  + 'TI3NjkiIHk9IjE0MC4zMzcxNyIgZm9udC1zaXplPSIzLjYzNjVweCIgc3Ryb2tlLXdpZHRoPSIuMDkwOTEzIiBzd'
  + 'HlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjEwOS4xMjc2OSIgeT0'
  + 'iMTQwLjMzNzE3IiBzdHJva2Utd2lkdGg9Ii4wOTA5MTMiPuWBpeW6t+eKtuaFizwvdHNwYW4+PC90ZXh0Pg0KICA'
  + 'gIDx0ZXh0IHg9IjEzLjMzNTIxNyIgeT0iMjQzLjIyNTA3IiBmb250LXNpemU9IjMuMjQ1MXB4IiBzdHJva2Utd2l'
  + 'kdGg9Ii4wODExMjciIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4ge'
  + 'D0iMTMuMzM1MjE3IiB5PSIyNDMuMjI1MDciIHN0cm9rZS13aWR0aD0iLjA4MTEyNyI+6YCa5Yuk5pmC6ZaTPC90c'
  + '3Bhbj48L3RleHQ+DQogICAgPHRleHQgeD0iNjAuMDA1OTU5IiB5PSIyNDMuMDc4NTUiIGZvbnQtc2l6ZT0iMy4wM'
  + 'zQ2cHgiIHN0cm9rZS13aWR0aD0iLjA3NTg2NSIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJ'
  + 'lc2VydmUiPjx0c3BhbiB4PSI2MC4wMDU5NTkiIHk9IjI0My4wNzg1NSIgc3Ryb2tlLXdpZHRoPSIuMDc1ODY1Ij7'
  + 'mibbppIrlrrbml488L3RzcGFuPjwvdGV4dD4NCiAgICA8dGV4dCB4PSIxMDYuNzE1OTgiIHk9IjI0My4xNTU1NiI'
  + 'gZm9udC1zaXplPSIzLjAxMjVweCIgc3Ryb2tlLXdpZHRoPSIuMDc1MzEyIiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yN'
  + 'SIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjEwNi43MTU5OCIgeT0iMjQzLjE1NTU2IiBzdHJva2Utd'
  + '2lkdGg9Ii4wNzUzMTIiPumFjeWBtuiAheOBruacieeEoTwvdHNwYW4+PC90ZXh0Pg0KICAgIDx0ZXh0IHg9IjIwL'
  + 'jU1OTEyMiIgeT0iMjUyLjI0ODQxIiBmb250LXNpemU9IjMuNDYxM3B4IiBzdHJva2Utd2lkdGg9Ii4wODY1MzIiIHN'
  + '0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMjAuNTU5MTIyIiB'
  + '5PSIyNTIuMjQ4NDEiIHN0cm9rZS13aWR0aD0iLjA4NjUzMiI+57SEPC90c3Bhbj48L3RleHQ+DQogICAgPHRleHQ'
  + 'geD0iNDIuNjg2MDY5IiB5PSIyNTIuMTY4MTgiIGZvbnQtc2l6ZT0iMy4yMDkxcHgiIHN0cm9rZS13aWR0aD0iLjA4M'
  + 'DIyNyIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSI0Mi42O'
  + 'DYwNjkiIHk9IjI1Mi4xNjgxOCIgc3Ryb2tlLXdpZHRoPSIuMDgwMjI3Ij7liIY8L3RzcGFuPjwvdGV4dD4NCiAgI'
  + 'CA8dGV4dCB4PSI2Ni4zMTUwNzEiIHk9IjI1Mi43MDQ5NiIgZm9udC1zaXplPSI0LjI5NjFweCIgc3Ryb2tlLXdpZHR'
  + 'oPSIuMTA3NCIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSI'
  + '2Ni4zMTUwNzEiIHk9IjI1Mi43MDQ5NiIgc3Ryb2tlLXdpZHRoPSIuMTA3NCI+4oC744CA5pyJ44CA44O744CA54S'
  + 'hPC90c3Bhbj48L3RleHQ+DQogICAgPHRleHQgeD0iMTMuNzY1NjM3IiB5PSIyNjEuNjY1MzciIGZvbnQtc2l6ZT0iO'
  + 'C40MzYycHgiIHN0cm9rZS13aWR0aD0iLjIxMDkxIiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlP'
  + 'SJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjEzLjc2NTYzNyIgeT0iMjYxLjY2NTM3IiBmb250LXNpemU9IjMuMzc0NXB4I'
  + 'iBzdHJva2Utd2lkdGg9Ii4yMTA5MSI+5pys5Lq65biM5pyb6KiY5YWl5qyE77yI54m544Gr57Wm5paZ44O76IG356i'
  + 'u44O75Yuk5YuZ5pmC6ZaT44O75Yuk5YuZ5Zyw44O744Gd44Gu5LuW44Gr44Gk44GE44Gm44Gu5biM5pyb44Gq44G'
  + 'p44GM44GC44KM44Gw6KiY5YWl77yJPC90c3Bhbj48L3RleHQ+DQogICAgPHRleHQgeD0iMTEzLjA2NDc3IiB5PSI'
  + 'yNTIuNTE0NDgiIGZvbnQtc2l6ZT0iNC4xMzAxcHgiIHN0cm9rZS13aWR0aD0iLjEwMzI1IiBzdHlsZT0ibGluZS1oZ'
  + 'WlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjExMy4wNjQ3NyIgeT0iMjUyLjUxNDQ4I'
  + 'iBzdHJva2Utd2lkdGg9Ii4xMDMyNSI+4oC744CA5pyJ44CA44O744CA54ShPC90c3Bhbj48L3RleHQ+DQogICAgP'
  + 'HRleHQgeD0iMTU4LjE5NjE3IiB5PSIyNTIuNDY5ODYiIGZvbnQtc2l6ZT0iNC4yOTYxcHgiIHN0cm9rZS13aWR0aD0'
  + 'iLjEwNzQiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMTU'
  + '4LjE5NjE3IiB5PSIyNTIuNDY5ODYiIHN0cm9rZS13aWR0aD0iLjEwNzQiPuKAu+OAgOacieOAgOODu+OAgOeEoTw'
  + 'vdHNwYW4+PC90ZXh0Pg0KICAgIDx0ZXh0IHg9IjE1Mi45ODUyOSIgeT0iMjQzLjE5MDYzIiBmb250LXNpemU9IjMuM'
  + 'DA1OXB4IiBzdHJva2Utd2lkdGg9Ii4wNzUxNDgiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9I'
  + 'nByZXNlcnZlIj48dHNwYW4geD0iMTUyLjk4NTI5IiB5PSIyNDMuMTkwNjMiIHN0cm9rZS13aWR0aD0iLjA3NTE0O'
  + 'CI+6YWN5YG26ICF44Gu5om26aSK576p5YuZPC90c3Bhbj48L3RleHQ+DQogICAgPHRleHQgeD0iMTQuMjQyODg1IiB'
  + '5PSIxMDUuODc0NTEiIGZvbnQtc2l6ZT0iMy42OTM2cHgiIHN0cm9rZS13aWR0aD0iLjIzMDg1IiBzdHlsZT0ibGl'
  + 'uZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjE0LjI0Mjg4NSIgeT0iMTA1Ljg'
  + '3NDUxIiBmb250LXNpemU9IjMuNjkzNnB4IiBzdHJva2Utd2lkdGg9Ii4yMzA4NSI+6Laj5ZGzPC90c3Bhbj48L3Rle'
  + 'HQ+DQogICAgPHRleHQgeD0iMTQuMTA3MzU2IiB5PSI4Mi4yOTU2ODUiIGZvbnQtc2l6ZT0iMy4yOTVweCIgc3Ryb'
  + '2tlLXdpZHRoPSIuMjA1OTQiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48d'
  + 'HNwYW4geD0iMTQuMTA3MzU2IiB5PSI4Mi4yOTU2ODUiIGZvbnQtc2l6ZT0iMy4yOTVweCIgc3Ryb2tlLXdpZHRoPSI'
  + 'uMjA1OTQiPuWFjeioseODu+izh+agvOOBq+mWouOBmeOCi+eJueiomOS6i+mghe+8iOWPluW+l+OBq+iHs+OBo+O'
  + 'Bn+e1jOe3r+ODu+WPluW+l+S6iOWumuOBruizh+agvOOBquOBqe+8iTwvdHNwYW4+PC90ZXh0Pg0KICAgIDx0ZXh'
  + '0IHg9IjEwOC42NzgwMiIgeT0iMTA2LjIyNzY0IiBmb250LXNpemU9IjMuOTY4cHgiIHN0cm9rZS13aWR0aD0iLjA5O'
  + 'TE5OSIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxMDguN'
  + 'jc4MDIiIHk9IjEwNi4yMjc2NCIgc3Ryb2tlLXdpZHRoPSIuMDk5MTk5Ij7nibnmioA8L3RzcGFuPjwvdGV4dD4NC'
  + 'iAgIDwvZz4NCiAgPC9nPg0KIDwvZz4NCjwvc3ZnPg0K';
    }
}
