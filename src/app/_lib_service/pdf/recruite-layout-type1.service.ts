/**
 * レイアウトファイル　経歴欄長め、免許資格欄有り
 */

import { Injectable } from '@angular/core';

@Injectable()
export class RecruiteLayoutType1Service {

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
    makeRecruiteLayout(content): any {
        const docDefinition = {
            content: [
                {
                    image: this.getLayoutPage1(),
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

    getLayoutPage1(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4N'
        + 'Cjxzdmcgd2lkdGg9IjIxMG1tIiBoZWlnaHQ9IjI5N21tIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMTA'
        + 'gMjk3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KIDxnIHRyYW5zZm9ybT0idHJhbnNsYX'
        + 'RlKC03Ljg3NjIgMTEuODc0KSI+DQogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCI+DQogICA8cGF0aCBkP'
        + 'SJtMjUuMDU3IDIxLjE3OCAwLjI1NTgxIDkwLjUzMyAxNzcuOTggMC41NjY5NyAwLjI4MzQ5LTU2LjkzNC00Ny44N'
        + 'DctMC4wMjY4NiAwLjA5NDUtMzQuMTM4eiIgc3Ryb2tlLXdpZHRoPSIuNDY1Ii8+DQogICA8ZyBzdHJva2Utd2lkd'
        + 'Gg9Ii4yNjQ1OHB4Ij4NCiAgICA8cGF0aCBkPSJtMjAzLjQ0IDU5Ljc1Ny0xNzguNCAwLjA5NDUiLz4NCiAgICA8c'
        + 'GF0aCBkPSJtMjUuMjMgNDEuNDg4IDEzMC41IDAuMDk0NDkiLz4NCiAgICA8cGF0aCBkPSJtMTMzLjA1IDIxLjI2N'
        + 'i0wLjA5NDUgMjAuMTI3Ii8+DQogICAgPHBhdGggZD0ibTI1LjI3MyAyNS40NTcgMTA3LjU4LTAuMDk0NDk0Ii8+D'
        + 'QogICAgPHBhdGggZD0ibTI1LjA0MSA1NS40MTcgMTMwLjY4LTAuMTAwNDEiLz4NCiAgICA8cGF0aCBkPSJtMjUuM'
        + 'TM1IDczLjI1N2gxNzguMjIiLz4NCiAgICA8cGF0aCBkPSJtMjUuMTM1IDgyLjUxNyAxNzguMTItMC4yODM0OCIvP'
        + 'g0KICAgIDxwYXRoIGQ9Im0yNS4xMzUgOTEuNzc4aDE3OC4yMiIvPg0KICAgPC9nPg0KICAgPHBhdGggZD0ibTE2N'
        + 'i4zMSA5MS42NjR2MjAuNiIgc3Ryb2tlLXdpZHRoPSIuMTY0NThweCIvPg0KICAgPHBhdGggZD0ibTI1LjIzIDk4L'
        + 'jYgMTQxLjA4LTAuMDk0NDk0IiBzdHJva2Utd2lkdGg9Ii4yNjQ1OHB4Ii8+DQogIDwvZz4NCiAgPGcgZmlsbD0iI'
        + 'zAwMDAwMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGxldHRlci1zcGFjaW5nPSIwcHgiIHdvcmQtc3BhY2luZ'
        + 'z0iMHB4Ij4NCiAgIDx0ZXh0IHRyYW5zZm9ybT0ic2NhbGUoMS4xMDQ1IC45MDUzOCkiIHg9IjI0LjQ3Njk5NyIge'
        + 'T0iMTguMzY4NjY2IiBmb250LXNpemU9IjcuNzk3M3B4IiBzdHJva2Utd2lkdGg9Ii4xOTQ5MyIgc3R5bGU9Imxpb'
        + 'mUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIyNC40NzY5OTciIHk9IjE4LjM2O'
        + 'DY2NiIgc3Ryb2tlLXdpZHRoPSIuMTk0OTMiPuWxpSDmrbQg5pu4PC90c3Bhbj48L3RleHQ+DQogICA8ZyBmb250L'
        + 'XNpemU9IjQuMjMzM3B4IiBzdHJva2Utd2lkdGg9Ii4yNjQ1OCI+DQogICAgPHRleHQgeD0iMTA3LjUwOTE3IiB5P'
        + 'SIxNi4zNjY5OTUiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4ge'
        + 'D0iMTA3LjUwOTE3IiB5PSIxNi4zNjY5OTUiIGZvbnQtc2l6ZT0iNC4yMzMzcHgiIHN0cm9rZS13aWR0aD0iLjI2N'
        + 'DU4Ij7lubQ8L3RzcGFuPjwvdGV4dD4NCiAgICA8dGV4dCB4PSIxMjQuMTQ2NzEiIHk9IjE2LjUwMDYzMSIgc3R5b'
        + 'GU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxMjQuMTQ2NzEiIHk9I'
        + 'jE2LjUwMDYzMSIgZm9udC1zaXplPSI0LjIzMzNweCIgc3Ryb2tlLXdpZHRoPSIuMjY0NTgiPuaciDwvdHNwYW4+P'
        + 'C90ZXh0Pg0KICAgIDx0ZXh0IHg9IjE0MS4xMTgzMiIgeT0iMTYuNDMzODEzIiBzdHlsZT0ibGluZS1oZWlnaHQ6M'
        + 'S4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjE0MS4xMTgzMiIgeT0iMTYuNDMzODEzIiBmb250L'
        + 'XNpemU9IjQuMjMzM3B4IiBzdHJva2Utd2lkdGg9Ii4yNjQ1OCI+5pelPC90c3Bhbj48L3RleHQ+DQogICAgPHRle'
        + 'HQgeD0iMTQ2LjI2MzIzIiB5PSIxNi42MzQyNjYiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9I'
        + 'nByZXNlcnZlIj48dHNwYW4geD0iMTQ2LjI2MzIzIiB5PSIxNi42MzQyNjYiIGZvbnQtc2l6ZT0iNC4yMzMzcHgiI'
        + 'HN0cm9rZS13aWR0aD0iLjI2NDU4Ij7nj77lnKg8L3RzcGFuPjwvdGV4dD4NCiAgIDwvZz4NCiAgPC9nPg0KICA8Z'
        + 'yBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiPg0KICAgPHBhdGggZD0ibTI1LjI1OCAxMjAuOTQgMC4wNjY4MSAxN'
        + 'DcuMDQgMTc3Ljk3LTAuMDY2OC0xZS01IC0xNDYuODh6IiBzdHJva2Utd2lkdGg9Ii41NjUiLz4NCiAgIDxnIHN0c'
        + 'm9rZS13aWR0aD0iLjI2NDU4cHgiPg0KICAgIDxwYXRoIGQ9Im0yNS4yNDYgMTI4LjA5IDE3OC4xMi0wLjA2NjgiL'
        + 'z4NCiAgICA8cGF0aCBkPSJtMjUuMzI0IDEzNy43NCAxNzguMTEgMC4xMzM2MyIvPg0KICAgIDxwYXRoIGQ9Im0yN'
        + 'S4yNTggMTQ3Ljg0IDE3OC4xNyAwLjA2NjgiLz4NCiAgICA8cGF0aCBkPSJtMjUuNDM4IDE1Ny43NSAxNzcuODQtM'
        + 'C4zMzQwOSIvPg0KICAgIDxwYXRoIGQ9Im0yNS4yMTcgMTY3Ljc5IDE3OC4yNC0wLjI2NzI3Ii8+DQogICAgPHBhd'
        + 'GggZD0ibTI1LjI4MSAxNzcuOTkgMTc4LjAzLTAuMjAwNDUiLz4NCiAgICA8cGF0aCBkPSJtMjUuMjMgMTg3LjgzI'
        + 'DE3Ny45OS0wLjAxMDA3Ii8+DQogICAgPHBhdGggZD0ibTI1LjI4OSAxOTcuOSAxNzcuOTIgMC4xMDM0MSIvPg0KI'
        + 'CAgIDxwYXRoIGQ9Im0yNS4yMzkgMjA3LjU5IDE3OC4xNiAwLjE2Mjk0Ii8+DQogICAgPHBhdGggZD0ibTI1LjI3N'
        + 'yAyMTcuNzZjMTQ3LjQyIDAuMDUzIDExOC42NSAwLjEwNjAxIDE3OC4wNiAwLjE1OTAxIi8+DQogICAgPHBhdGggZ'
        + 'D0ibTI1LjMwMSAyMjcuNDUgMTc4LjExIDAuMjQwMDciLz4NCiAgICA8cGF0aCBkPSJtMjUuMjMgMjM3LjY1IDE3N'
        + 'y45OSAwLjA4MjkiLz4NCiAgIDwvZz4NCiAgIDxwYXRoIGQ9Im0yNS4xODMgMjQ3LjgyIDE3OC4xMS0wLjA2NDEiI'
        + 'HN0cm9rZS13aWR0aD0iLjI2NSIvPg0KICAgPHBhdGggZD0ibTQ3LjMwNyAxMjAuNzR2MTQ3LjEzIiBzdHJva2Utd'
        + '2lkdGg9Ii4yNjQ1OHB4Ii8+DQogICA8cGF0aCBkPSJtNjMuMDc2IDEyMC45NCAwLjEyMDQ0IDE0Ni45NiIgc3Ryb'
        + '2tlLXdpZHRoPSIuMjY0NThweCIvPg0KICA8L2c+DQogIDxnIGZpbGw9IiMwMDAwMDAiIGZvbnQtZmFtaWx5PSJzY'
        + 'W5zLXNlcmlmIiBsZXR0ZXItc3BhY2luZz0iMHB4IiB3b3JkLXNwYWNpbmc9IjBweCI+DQogICA8ZyBmb250LXNpe'
        + 'mU9IjMuMTc1cHgiIHN0cm9rZS13aWR0aD0iLjI2NDU4Ij4NCiAgICA8dGV4dCB4PSIzNC45MjMzNzgiIHk9IjEyN'
        + 'S41NjczMiIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIzN'
        + 'C45MjMzNzgiIHk9IjEyNS41NjczMiIgZm9udC1zaXplPSIzLjE3NXB4IiBzdHJva2Utd2lkdGg9Ii4yNjQ1OCI+5'
        + 'bm0PC90c3Bhbj48L3RleHQ+DQogICAgPHRleHQgeD0iNTMuNjk5ODc1IiB5PSIxMjUuNTc4MDQiIHN0eWxlPSJsa'
        + 'W5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iNTMuNjk5ODc1IiB5PSIxMjUuN'
        + 'Tc4MDQiIGZvbnQtc2l6ZT0iMy4xNzVweCIgc3Ryb2tlLXdpZHRoPSIuMjY0NTgiPuaciDwvdHNwYW4+PC90ZXh0P'
        + 'g0KICAgIDx0ZXh0IHg9IjEwMi4yNTE3IiB5PSIxMjUuNTk5NjQiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4b'
        + 'Ww6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMTAyLjI1MTciIHk9IjEyNS41OTk2NCIgZm9udC1zaXplPSIzL'
        + 'jE3NXB4IiBzdHJva2Utd2lkdGg9Ii4yNjQ1OCI+5a2m5q2044O76IG35q2044Gq44Gp77yI6aCF55uu5Yil44Gr4'
        + '4G+44Go44KB44Gm6KiY5YWl77yJPC90c3Bhbj48L3RleHQ+DQogICA8L2c+DQogICA8dGV4dCB4PSIyNi44NjA1O'
        + 'DgiIHk9IjI0Ljk4NjQzNyIgZm9udC1zaXplPSIyLjExNjdweCIgc3Ryb2tlLXdpZHRoPSIuMjY0NTgiIHN0eWxlP'
        + 'SJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMjYuODYwNTg4IiB5PSIyN'
        + 'C45ODY0MzciIGZvbnQtc2l6ZT0iMi4xMTY3cHgiIHN0cm9rZS13aWR0aD0iLjI2NDU4Ij7jgbXjgorjgYzjgao8L'
        + '3RzcGFuPjwvdGV4dD4NCiAgIDx0ZXh0IHRyYW5zZm9ybT0ic2NhbGUoMS4wMzI0IC45Njg1OSkiIHg9IjI2LjM1M'
        + 'TcxMSIgeT0iMzUuNjYxNDg0IiBmb250LXNpemU9IjQuMzcwNnB4IiBzdHJva2Utd2lkdGg9Ii4yNzMxNiIgc3R5b'
        + 'GU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIyNi4zNTE3MTEiIHk9I'
        + 'jM1LjY2MTQ4NCIgZm9udC1zaXplPSI0LjM3MDZweCIgc3Ryb2tlLXdpZHRoPSIuMjczMTYiPuawj+OAgOWQjTwvd'
        + 'HNwYW4+PC90ZXh0Pg0KICAgPGcgZm9udC1zaXplPSI0LjIzMzNweCIgc3Ryb2tlLXdpZHRoPSIuMjY0NTgiPg0KI'
        + 'CAgIDx0ZXh0IHg9IjI2LjM5Mjg2NCIgeT0iNDkuNTc1MjM3IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sO'
        + 'nNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjI2LjM5Mjg2NCIgeT0iNDkuNTc1MjM3IiBmb250LXNpemU9IjQuM'
        + 'jMzM3B4IiBzdHJva2Utd2lkdGg9Ii4yNjQ1OCI+55Sf5bm05pyI5pelPC90c3Bhbj48L3RleHQ+DQogICAgPHRle'
        + 'HQgeD0iNjMuMDc1NjExIiB5PSI0OS43MDg4NjYiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9I'
        + 'nByZXNlcnZlIj48dHNwYW4geD0iNjMuMDc1NjExIiB5PSI0OS43MDg4NjYiIGZvbnQtc2l6ZT0iNC4yMzMzcHgiI'
        + 'HN0cm9rZS13aWR0aD0iLjI2NDU4Ij7lubQ8L3RzcGFuPjwvdGV4dD4NCiAgICA8dGV4dCB4PSI4Ni40NjE2OTMiI'
        + 'Hk9IjQ5LjY0MjA1MiIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3Bhb'
        + 'iB4PSI4Ni40NjE2OTMiIHk9IjQ5LjY0MjA1MiIgZm9udC1zaXplPSI0LjIzMzNweCIgc3Ryb2tlLXdpZHRoPSIuM'
        + 'jY0NTgiPuaciDwvdHNwYW4+PC90ZXh0Pg0KICAgIDx0ZXh0IHg9IjEwNS41MDQ2NCIgeT0iNDkuNzc1Njg0IiBzd'
        + 'HlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjEwNS41MDQ2NCIge'
        + 'T0iNDkuNzc1Njg0IiBmb250LXNpemU9IjQuMjMzM3B4IiBzdHJva2Utd2lkdGg9Ii4yNjQ1OCI+5pel55SfPC90c'
        + '3Bhbj48L3RleHQ+DQogICAgPHRleHQgeD0iMTEyLjcyMDkyIiB5PSI0OS43NzU2ODgiIHN0eWxlPSJsaW5lLWhla'
        + 'WdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMTEyLjcyMDkyIiB5PSI0OS43NzU2ODgiI'
        + 'GZvbnQtc2l6ZT0iNC4yMzMzcHgiIHN0cm9rZS13aWR0aD0iLjI2NDU4Ij7vvIjmuoA8L3RzcGFuPjwvdGV4dD4NC'
        + 'iAgICA8dGV4dCB4PSIxMzIuNjk5MzQiIHk9IjQ5LjcwODg2NiIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtb'
        + 'DpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxMzIuNjk5MzQiIHk9IjQ5LjcwODg2NiIgZm9udC1zaXplPSI0L'
        + 'jIzMzNweCIgc3Ryb2tlLXdpZHRoPSIuMjY0NTgiPuaJje+8iTwvdHNwYW4+PC90ZXh0Pg0KICAgPC9nPg0KICAgP'
        + 'HRleHQgeD0iMjYuOTk0MjI1IiB5PSI1OS4xOTY5MzgiIGZvbnQtc2l6ZT0iMi4xMTY3cHgiIHN0cm9rZS13aWR0a'
        + 'D0iLjI2NDU4IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9I'
        + 'jI2Ljk5NDIyNSIgeT0iNTkuMTk2OTM4IiBmb250LXNpemU9IjIuMTE2N3B4IiBzdHJva2Utd2lkdGg9Ii4yNjQ1O'
        + 'CI+44G144KK44GM44GqPC90c3Bhbj48L3RleHQ+DQogICA8ZyBmb250LXNpemU9IjMuNTI3OHB4IiBzdHJva2Utd'
        + '2lkdGg9Ii4yNjQ1OCI+DQogICAgPHRleHQgeD0iMjYuNjYwMTM1IiB5PSI2NS4xNDM2ODQiIHN0eWxlPSJsaW5lL'
        + 'WhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMjYuNjYwMTM1IiB5PSI2NS4xNDM2O'
        + 'DQiIGZvbnQtc2l6ZT0iMy41Mjc4cHgiIHN0cm9rZS13aWR0aD0iLjI2NDU4Ij7nj77kvY/miYA8L3RzcGFuPjwvd'
        + 'GV4dD4NCiAgICA8dGV4dCB4PSI0MS40MjY3NzciIHk9IjY0LjYwOTE0NiIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuM'
        + 'jUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSI0MS40MjY3NzciIHk9IjY0LjYwOTE0NiIgZm9udC1za'
        + 'XplPSIzLjUyNzhweCIgc3Ryb2tlLXdpZHRoPSIuMjY0NTgiPuOAkjwvdHNwYW4+PC90ZXh0Pg0KICAgIDx0ZXh0I'
        + 'Hg9IjEzNC4wNzg0IiB5PSIyNi4xODcxODEiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZ'
        + 'XNlcnZlIj48dHNwYW4geD0iMTM0LjA3ODQiIHk9IjI2LjE4NzE4MSIgZm9udC1zaXplPSIzLjUyNzhweCIgc3Ryb'
        + '2tlLXdpZHRoPSIuMjY0NTgiPuaAp+WIpTwvdHNwYW4+PC90ZXh0Pg0KICAgIDx0ZXh0IHg9IjEzOS4wNTgxMSIge'
        + 'T0iMzIuNDIyMTU3IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuI'
        + 'Hg9IjEzOS4wNTgxMSIgeT0iMzIuNDIyMTU3IiBmb250LXNpemU9IjMuNTI3OHB4IiBzdHJva2Utd2lkdGg9Ii4yN'
        + 'jQ1OCI+55S344O75aWzPC90c3Bhbj48L3RleHQ+DQogICAgPHRleHQgeD0iMjcuMjYxNDk0IiB5PSI3OS4zMDg5N'
        + 'jgiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMjcuMjYxN'
        + 'Dk0IiB5PSI3OS4zMDg5NjgiIGZvbnQtc2l6ZT0iMy41Mjc4cHgiIHN0cm9rZS13aWR0aD0iLjI2NDU4Ij5URUw8L'
        + '3RzcGFuPjwvdGV4dD4NCiAgICA8dGV4dCB4PSIyNy4xOTQ2NzUiIHk9Ijg4LjMyOTMxNSIgc3R5bGU9ImxpbmUta'
        + 'GVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIyNy4xOTQ2NzUiIHk9Ijg4LjMyOTMxN'
        + 'SIgZm9udC1zaXplPSIzLjUyNzhweCIgc3Ryb2tlLXdpZHRoPSIuMjY0NTgiPkZBWDwvdHNwYW4+PC90ZXh0Pg0KI'
        + 'CAgPC9nPg0KICA8L2c+DQogIDxwYXRoIGQ9Im0xMTUuMDkgNzMuMTQ0LTAuMTg4OTkgMTguNDI2IiBmaWxsPSJub'
        + '25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iLjI2NDU4cHgiLz4NCiAgPGcgZmlsbD0iIzAwMDAwMCIgZ'
        + 'm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGxldHRlci1zcGFjaW5nPSIwcHgiIHN0cm9rZS13aWR0aD0iLjI2NDU4I'
        + 'iB3b3JkLXNwYWNpbmc9IjBweCI+DQogICA8dGV4dCB4PSIxMTUuOTM2MTgiIHk9Ijc5LjMyMjc0NiIgZm9udC1za'
        + 'XplPSIzLjUyNzhweCIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3Bhb'
        + 'iB4PSIxMTUuOTM2MTgiIHk9Ijc5LjMyMjc0NiIgZm9udC1zaXplPSIzLjUyNzhweCIgc3Ryb2tlLXdpZHRoPSIuM'
        + 'jY0NTgiPuaQuuW4r+mbu+ipsTwvdHNwYW4+PC90ZXh0Pg0KICAgPHRleHQgeD0iMTE2LjU4MTQzIiB5PSI4OC40M'
        + 'jg1NzQiIGZvbnQtc2l6ZT0iMy41Mjc4cHgiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZ'
        + 'XNlcnZlIj48dHNwYW4geD0iMTE2LjU4MTQzIiB5PSI4OC40Mjg1NzQiIGZvbnQtc2l6ZT0iMy41Mjc4cHgiIHN0c'
        + 'm9rZS13aWR0aD0iLjI2NDU4Ij5FLW1haWw8L3RzcGFuPjwvdGV4dD4NCiAgIDx0ZXh0IHg9IjI2LjQ3OTI5NiIge'
        + 'T0iOTYuMjQxNzQ1IiBmb250LXNpemU9IjIuMTE2N3B4IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwY'
        + 'WNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjI2LjQ3OTI5NiIgeT0iOTYuMjQxNzQ1IiBmb250LXNpemU9IjIuMTE2N'
        + '3B4IiBzdHJva2Utd2lkdGg9Ii4yNjQ1OCI+44G144KK44GM44GqPC90c3Bhbj48L3RleHQ+DQogICA8dGV4dCB4P'
        + 'SIyNi44MjY4MTUiIHk9IjEwMy4yNzA2NiIgZm9udC1zaXplPSIzLjUyNzhweCIgc3R5bGU9ImxpbmUtaGVpZ2h0O'
        + 'jEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIyNi44MjY4MTUiIHk9IjEwMy4yNzA2NiIgZm9ud'
        + 'C1zaXplPSIzLjUyNzhweCIgc3Ryb2tlLXdpZHRoPSIuMjY0NTgiPumAo+e1oeWFiDwvdHNwYW4+PC90ZXh0Pg0KI'
        + 'CAgPHRleHQgeD0iNDEuNDEzMjg0IiB5PSIxMDIuOTc3MDYiIGZvbnQtc2l6ZT0iMy41Mjc4cHgiIHN0eWxlPSJsa'
        + 'W5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iNDEuNDEzMjg0IiB5PSIxMDIuO'
        + 'Tc3MDYiIGZvbnQtc2l6ZT0iMy41Mjc4cHgiIHN0cm9rZS13aWR0aD0iLjI2NDU4Ij7jgJI8L3RzcGFuPjwvdGV4d'
        + 'D4NCiAgIDx0ZXh0IHg9Ijk5LjczNjYwMyIgeT0iMTAzLjMzNDA4IiBmb250LXNpemU9IjIuODIyMnB4IiBzdHlsZ'
        + 'T0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9Ijk5LjczNjYwMyIgeT0iM'
        + 'TAzLjMzNDA4IiBmb250LXNpemU9IjIuODIyMnB4IiBzdHJva2Utd2lkdGg9Ii4yNjQ1OCI+77yI54++5L2P5omA5'
        + 'Lul5aSW44Gr6YCj57Wh44KS5biM5pyb44GZ44KL5aC05ZCI44Gu44G/6KiY5YWl77yJPC90c3Bhbj48L3RleHQ+D'
        + 'QogICA8dGV4dCB4PSIxNTkuODU4MDgiIHk9IjEwOS44MTY5OSIgZm9udC1zaXplPSIzLjUyNzhweCIgc3R5bGU9I'
        + 'mxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxNTkuODU4MDgiIHk9IjEwO'
        + 'S44MTY5OSIgZm9udC1zaXplPSIzLjUyNzhweCIgc3Ryb2tlLXdpZHRoPSIuMjY0NTgiPuaWuTwvdHNwYW4+PC90Z'
        + 'Xh0Pg0KICAgPHRleHQgeD0iMTY4LjU1MzUiIHk9Ijk2LjQ3NDYyNSIgZm9udC1zaXplPSIzLjUyNzhweCIgc3R5b'
        + 'GU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxNjguNTUzNSIgeT0iO'
        + 'TYuNDc0NjI1IiBmb250LXNpemU9IjMuNTI3OHB4IiBzdHJva2Utd2lkdGg9Ii4yNjQ1OCI+VEVMPC90c3Bhbj48L'
        + '3RleHQ+DQogICA8ZyBmb250LXNpemU9IjIuODIyMnB4Ij4NCiAgICA8dGV4dCB4PSIyNy4xMTk3OTMiIHk9IjI3M'
        + 'y4wOTI5OSIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIyN'
        + 'y4xMTk3OTMiIHk9IjI3My4wOTI5OSIgZm9udC1zaXplPSIyLjgyMjJweCIgc3Ryb2tlLXdpZHRoPSIuMjY0NTgiP'
        + 'uiomOWFpeS4iuOBruazqOaEjzwvdHNwYW4+PC90ZXh0Pg0KICAgIDx0ZXh0IHg9IjUxLjEyMTI4MSIgeT0iMjczL'
        + 'jA5Mjk5IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjUxL'
        + 'jEyMTI4MSIgeT0iMjczLjA5Mjk5IiBmb250LXNpemU9IjIuODIyMnB4IiBzdHJva2Utd2lkdGg9Ii4yNjQ1OCI+7'
        + '7yR77yO6Ymb562G5Lul5aSW44Gu6buS5Y+I44Gv6Z2S44Gu562G6KiY5YW344Gn6KiY5YWlPC90c3Bhbj48L3Rle'
        + 'HQ+DQogICAgPHRleHQgeD0iMTE0LjAxNjUzIiB5PSIyNzMuMDM2MjkiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1I'
        + 'iB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMTE0LjAxNjUzIiB5PSIyNzMuMDM2MjkiIGZvbnQtc2l6Z'
        + 'T0iMi44MjIycHgiIHN0cm9rZS13aWR0aD0iLjI2NDU4Ij7vvJLvvI7mlbDlrZfjga/jgqLjg6njg5PjgqLmlbDlr'
        + 'ZfjgafjgIHmloflrZfjga/jgY/jgZrjgZXjgZrmraPnorrjgavmm7jjgY/jgII8L3RzcGFuPjwvdGV4dD4NCiAgI'
        + 'CA8dGV4dCB4PSI1MS4yOTEzNzQiIHk9IjI3Ny40Mzk3IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwY'
        + 'WNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjUxLjI5MTM3NCIgeT0iMjc3LjQzOTciIGZvbnQtc2l6ZT0iMi44MjIyc'
        + 'HgiIHN0cm9rZS13aWR0aD0iLjI2NDU4Ij7vvJPvvI7igLvljbDjga7jgajjgZPjgo3jga/jgIHoqbLlvZPjgZnjg'
        + 'ovjgoLjga7jgpLil4vjgaflm7LjgoDjgII8L3RzcGFuPjwvdGV4dD4NCiAgIDwvZz4NCiAgPC9nPg0KICA8cGF0a'
        + 'CBkPSJtMTY3Ljc2IDUuNDIzOC0wLjE4ODk4IDM3LjYwOSAyOC40NDMgMC4wOTQ1LTAuMDk0NS0zNy41MTR6IiBma'
        + 'WxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1kYXNoYXJyYXk9IjAuNzkzNzQ5OTUsIDAuMjY0NTgzMzIwM'
        + 'DAwMDAwMDEiIHN0cm9rZS1vcGFjaXR5PSIuNDc1OTYiIHN0cm9rZS13aWR0aD0iLjI2NDU4Ii8+DQogIDx0ZXh0I'
        + 'Hg9IjE3Ni45NjI3NyIgeT0iMjQuODY4NjA1IiBmaWxsPSIjMDAwMDAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZ'
        + 'iIgZm9udC1zaXplPSI0LjI3NzNweCIgbGV0dGVyLXNwYWNpbmc9IjBweCIgc3Ryb2tlLXdpZHRoPSIuMTA2OTMiI'
        + 'HdvcmQtc3BhY2luZz0iMHB4IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+P'
        + 'HRzcGFuIHg9IjE3Ni45NjI3NyIgeT0iMjQuODY4NjA1IiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9Ii41M'
        + 'Dk2MiIgc3Ryb2tlLXdpZHRoPSIuMTA2OTMiPuWGmeecnzwvdHNwYW4+PC90ZXh0Pg0KIDwvZz4NCiA8cGF0aCBkP'
        + 'SJtMTcuMTk4IDI2OS41aDE3OC4yMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9Ii4yN'
        + 'jQ1OHB4Ii8+DQo8L3N2Zz4NCg==';
    }

    getLayoutPage2(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4'
    + 'NCjxzdmcgd2lkdGg9IjIxMG1tIiBoZWlnaHQ9IjI5N21tIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyM'
    + 'TAgMjk3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KIDxnIGZpbGw9Im5vbmUiIHN0cm9'
    + 'rZT0iIzAwMCI+DQogIDxwYXRoIGQ9Im05LjgyNzQgMTUuMzEzIDE5MS45NiAwLjA0NzI1IDAuMDQ3MiA1OS42N'
    + 'zMtMTkyLjAxLTAuMDQ3MjV6IiBzdHJva2Utd2lkdGg9Ii41NjUiLz4NCiAgPGcgc3Ryb2tlLXdpZHRoPSIuMjY'
    + '0NThweCI+DQogICA8cGF0aCBkPSJtOS45MjE5IDIzLjAxNSAxOTEuOTUtMC4wNTg3MTEiLz4NCiAgIDxwYXRoI'
    + 'GQ9Im05LjkyMTkgMzMuMDc4IDE5MS45NiAwLjA0MDEyNSIvPg0KICAgPHBhdGggZD0ibTkuOTY5MSA0My41Njc'
    + 'gMTkxLjg1IDAuMDY3OCIvPg0KICAgPHBhdGggZD0ibTIwMS44NSA1NC4yNTItMTkxLjkzLTAuMDUzOTYzIi8+D'
    + 'QogICA8cGF0aCBkPSJtOS43ODAxIDY0LjE2N2gxOTEuMyIvPg0KICAgPHBhdGggZD0ibTMzLjU5MyAxNS4yNjY'
    + 'tMC4wNDcyNSA1OS44MTUiLz4NCiAgPC9nPg0KICA8cGF0aCBkPSJtNTAuMjcxIDc0Ljc1di01OS41MzEiIHN0c'
    + 'm9rZS13aWR0aD0iLjQ2NSIvPg0KICA8cGF0aCB0cmFuc2Zvcm09InNjYWxlKC4yNjQ1OCkiIGQ9Im0zNy4wNTM'
    + 'gMjk4LjE1IDAuMDkwMTIgNzY2LjcgNzI1LjM2IDAuMTc4NiAwLjA5MDEtNzY2Ljc5eiIgc3Ryb2tlLXdpZHRoP'
    + 'SIyLjEzNTQiLz4NCiAgPGcgc3Ryb2tlLXdpZHRoPSIuMjY0NThweCI+DQogICA8cGF0aCBkPSJtOS42MTQ4IDg'
    + '2LjE4NCAxOTIuMTEtMC4xMTgxMiIvPg0KICAgPHBhdGggZD0ibTIwMS44NCA5Ni42OTYtMTkyLjEzLTAuMDIzN'
    + 'jIzIi8+DQogICA8cGF0aCBkPSJtMzQuMzAxIDc4Ljk3OSAwLjA5NDQ5IDc3Ljc5MiIvPg0KICAgPHBhdGggZD0'
    + 'ibTUwLjY0OSA3OC42OTUtMC4zNzc5OCA3OC4wNzYiLz4NCiAgIDxwYXRoIGQ9Im05LjgyNzQgMTA3LjE5IDE5M'
    + 'S45NCAwLjA0NzMiLz4NCiAgIDxwYXRoIGQ9Im05Ljk0NTUgMTE3LjM5IDE5MS44NS0wLjA0NzI1Ii8+DQogICA'
    + '8cGF0aCBkPSJtOS45NjkxIDEyNy4xIDE5MS43NSAwLjAyMzYiLz4NCiAgIDxwYXRoIGQ9Im05Ljc4MDEgMTM2L'
    + 'jg4IDE5MS44OS0wLjA0NzI1Ii8+DQogICA8cGF0aCBkPSJtOS45MjE5IDE0Ni41MiAxOTEuODcgMC4wNDczIi8'
    + '+DQogICA8cGF0aCBkPSJtOS44MDM4IDE1Ni43NyAxOTEuOTItMC4wNDcyIi8+DQogICA8cGF0aCBkPSJtOS43M'
    + 'DkzIDE5OC40MiAxOTEuOTQgMC4wMjM2Ii8+DQogICA8cGF0aCBkPSJtOS44OTgzIDI0MC45NyAxOTIuMDQtMC4'
    + 'zMzA3MyIvPg0KICAgPHBhdGggZD0ibTkuOTY5MSAyNjAuMTIgMTkxLjgyIDAuMDIzNiIvPg0KICAgPHBhdGggZ'
    + 'D0ibTU3Ljg3OCAyNDEuMTUgMC4xNjUzNiAxOS4wNDEiLz4NCiAgIDxwYXRoIGQ9Im0xMDYuMDIgMjQwLjczIDA'
    + 'uMDIzNiAxOS4zNzEiLz4NCiAgIDxwYXRoIGQ9Im0xNTQgMjQwLjh2MTkuMzI0Ii8+DQogIDwvZz4NCiA8L2c+D'
    + 'QogPGcgZmlsbD0iIzAwMDAwMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGxldHRlci1zcGFjaW5nPSIwcHg'
    + 'iIHdvcmQtc3BhY2luZz0iMHB4Ij4NCiAgPHRleHQgeD0iMTkuNTY1NTY1IiB5PSIyMC4zMjc4MTYiIGZvbnQtc'
    + '2l6ZT0iMy42ODI3cHgiIHN0cm9rZS13aWR0aD0iLjA5MjA2NyIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHh'
    + 'tbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxOS41NjU1NjUiIHk9IjIwLjMyNzgxNiIgc3Ryb2tlLXdpZ'
    + 'HRoPSIuMDkyMDY3Ij7lubQ8L3RzcGFuPjwvdGV4dD4NCiAgPHRleHQgeD0iMzkuOTExNzQzIiB5PSIyMC4yNzQ'
    + 'xMzYiIGZvbnQtc2l6ZT0iMy4zODAzcHgiIHN0cm9rZS13aWR0aD0iLjA4NDUwNiIgc3R5bGU9ImxpbmUtaGVpZ'
    + '2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIzOS45MTE3NDMiIHk9IjIwLjI3NDEzNiI'
    + 'gc3Ryb2tlLXdpZHRoPSIuMDg0NTA2Ij7mnIg8L3RzcGFuPjwvdGV4dD4NCiAgPHRleHQgeD0iOTMuMDE5NjE1I'
    + 'iB5PSIyMC4yMzAxOSIgZm9udC1zaXplPSIzLjQ5M3B4IiBzdHJva2Utd2lkdGg9Ii4wODczMjYiIHN0eWxlPSJ'
    + 'saW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iOTMuMDE5NjE1IiB5PSIyM'
    + 'C4yMzAxOSIgc3Ryb2tlLXdpZHRoPSIuMDg3MzI2Ij7lrabmrbTjg7vogbfmrbTjgarjganvvIjpoIXnm67liKX'
    + 'jgavjgb7jgajjgoHjgaboqJjlhaXvvIk8L3RzcGFuPjwvdGV4dD4NCiAgPHRleHQgeD0iMjAuMDc0NCIgeT0iO'
    + 'DMuODIyMjgxIiBmb250LXNpemU9IjMuNjU2MXB4IiBzdHJva2Utd2lkdGg9Ii4wOTE0MDIiIHN0eWxlPSJsaW5'
    + 'lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMjAuMDc0NCIgeT0iODMuODIyM'
    + 'jgxIiBzdHJva2Utd2lkdGg9Ii4wOTE0MDIiPuW5tDwvdHNwYW4+PC90ZXh0Pg0KICA8dGV4dCB4PSI0MC4yNjQ'
    + 'xMyIgeT0iODMuNzk0OCIgZm9udC1zaXplPSIzLjcxMXB4IiBzdHJva2Utd2lkdGg9Ii4wOTI3NzYiIHN0eWxlP'
    + 'SJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iNDAuMjY0MTMiIHk9Ijg'
    + 'zLjc5NDgiIHN0cm9rZS13aWR0aD0iLjA5Mjc3NiI+5pyIPC90c3Bhbj48L3RleHQ+DQogIDx0ZXh0IHg9IjExN'
    + 'y4wMTMyNCIgeT0iODMuODc5NDI1IiBmb250LXNpemU9IjMuNjI3M3B4IiBzdHJva2Utd2lkdGg9Ii4wOTA2ODI'
    + 'iIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMTE3LjAxM'
    + 'zI0IiB5PSI4My44Nzk0MjUiIHN0cm9rZS13aWR0aD0iLjA5MDY4MiI+5YWN6Kix44O76LOH5qC8PC90c3Bhbj4'
    + '8L3RleHQ+DQogIDx0ZXh0IHg9IjExLjYxODAyNSIgeT0iMTYyLjgyMDM0IiBmb250LXNpemU9IjMuNTM5OXB4I'
    + 'iBzdHJva2Utd2lkdGg9Ii4wODg0OTgiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXN'
    + 'lcnZlIj48dHNwYW4geD0iMTEuNjE4MDI1IiB5PSIxNjIuODIwMzQiIHN0cm9rZS13aWR0aD0iLjA4ODQ5OCI+5'
    + 'b+X5pyb5YuV5qmfPC90c3Bhbj48L3RleHQ+DQogIDx0ZXh0IHg9IjExLjI4NDc1NCIgeT0iMjA1LjA1OTM2IiB'
    + 'mb250LXNpemU9IjQuMTg5NHB4IiBzdHJva2Utd2lkdGg9Ii4xMDQ3MyIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuM'
    + 'jUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxMS4yODQ3NTQiIHk9IjIwNS4wNTkzNiI+6Ieq5be'
    + 'xUFI8L3RzcGFuPjx0c3BhbiB4PSIxMS4yODQ3NTQiIHk9IjIxMC4yOTYwOCIvPjwvdGV4dD4NCiAgPHRleHQge'
    + 'D0iMTIuMTg2MjE2IiB5PSIyNDQuNjQwODUiIGZvbnQtc2l6ZT0iMy4yMDkzcHgiIHN0cm9rZS13aWR0aD0iLjA'
    + '4MDIzMyIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxM'
    + 'i4xODYyMTYiIHk9IjI0NC42NDA4NSIgc3Ryb2tlLXdpZHRoPSIuMDgwMjMzIj7pgJrli6TmmYLplpM8L3RzcGF'
    + 'uPjwvdGV4dD4NCiAgPHRleHQgeD0iMTQuNjQ3MzkyIiB5PSIyNTQuMTM4ODIiIGZvbnQtc2l6ZT0iNC4xMTg2c'
    + 'HgiIHN0cm9rZS13aWR0aD0iLjEwMjk3IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmV'
    + 'zZXJ2ZSI+PHRzcGFuIHg9IjE0LjY0NzM5MiIgeT0iMjU0LjEzODgyIiBzdHJva2Utd2lkdGg9Ii4xMDI5NyI+5'
    + '7SEPC90c3Bhbj48L3RleHQ+DQogIDx0ZXh0IHg9IjUwLjE1MzIzNiIgeT0iMjU0LjIyNzgiIGZvbnQtc2l6ZT0'
    + 'iMy41OTVweCIgc3Ryb2tlLXdpZHRoPSIuMDg5ODc0IiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwY'
    + 'WNlPSJwcmVzZXJ2ZSI+PHRzcGFuIHg9IjUwLjE1MzIzNiIgeT0iMjU0LjIyNzgiIHN0cm9rZS13aWR0aD0iLjA'
    + '4OTg3NCI+5YiGPC90c3Bhbj48L3RleHQ+DQogIDx0ZXh0IHg9IjU4LjcyNzA3NCIgeT0iMjQ1LjE4MjA3IiBmb'
    + '250LXNpemU9IjQuMDg5NnB4IiBzdHJva2Utd2lkdGg9Ii4xMDIyNCIgc3R5bGU9ImxpbmUtaGVpZ2h0OjEuMjU'
    + 'iIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSI1OC43MjcwNzQiIHk9IjI0NS4xODIwNyIgc3Ryb2tlL'
    + 'XdpZHRoPSIuMTAyMjQiPuaJtumkiuWutuaXjzwvdHNwYW4+PC90ZXh0Pg0KICA8dGV4dCB4PSI5NS44ODc4MjU'
    + 'iIHk9IjI1NC41NDg1NCIgZm9udC1zaXplPSI0LjUzNTdweCIgc3Ryb2tlLXdpZHRoPSIuMTEzMzkiIHN0eWxlP'
    + 'SJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iOTUuODg3ODI1IiB5PSI'
    + 'yNTQuNTQ4NTQiIHN0cm9rZS13aWR0aD0iLjExMzM5Ij7kuro8L3RzcGFuPjwvdGV4dD4NCiAgPHRleHQgeD0iM'
    + 'TA3LjYyNDYiIHk9IjI0NC43MTYwMiIgZm9udC1zaXplPSIzLjIyMXB4IiBzdHJva2Utd2lkdGg9Ii4wODA1MjU'
    + 'iIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMTA3LjYyN'
    + 'DYiIHk9IjI0NC43MTYwMiIgc3Ryb2tlLXdpZHRoPSIuMDgwNTI1Ij7phY3lgbbogIXjga7mnInnhKE8L3RzcGF'
    + 'uPjwvdGV4dD4NCiAgPHRleHQgeD0iMTEyLjY3Nzk5IiB5PSIyNTQuNjE0OSIgZm9udC1zaXplPSI0LjU4ODNwe'
    + 'CIgc3Ryb2tlLXdpZHRoPSIuMTE0NzEiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1IiB4bWw6c3BhY2U9InByZXN'
    + 'lcnZlIj48dHNwYW4geD0iMTEyLjY3Nzk5IiB5PSIyNTQuNjE0OSIgc3Ryb2tlLXdpZHRoPSIuMTE0NzEiPuKAu'
    + '+OAgOacieOAgOODu+OAgOeEoTwvdHNwYW4+PC90ZXh0Pg0KICA8dGV4dCB4PSIxNTUuOTcyNiIgeT0iMjQ0Ljc'
    + '5NjI1IiBmb250LXNpemU9IjMuMDQzM3B4IiBzdHJva2Utd2lkdGg9Ii4wNzYwODMiIHN0eWxlPSJsaW5lLWhla'
    + 'WdodDoxLjI1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMTU1Ljk3MjYiIHk9IjI0NC43OTYyNSI'
    + 'gc3Ryb2tlLXdpZHRoPSIuMDc2MDgzIj7phY3lgbbogIXjga7mibbppIrnvqnli5k8L3RzcGFuPjwvdGV4dD4NC'
    + 'iAgPHRleHQgeD0iMTYxLjc2NjgyIiB5PSIyNTQuMjkwMDIiIGZvbnQtc2l6ZT0iNC4zMDQ4cHgiIHN0cm9rZS1'
    + '3aWR0aD0iLjEwNzYyIiBzdHlsZT0ibGluZS1oZWlnaHQ6MS4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRzc'
    + 'GFuIHg9IjE2MS43NjY4MiIgeT0iMjU0LjI5MDAyIiBzdHJva2Utd2lkdGg9Ii4xMDc2MiI+4oC744CA5pyJ44C'
    + 'A44O744CA54ShPC90c3Bhbj48L3RleHQ+DQogIDx0ZXh0IHg9IjEyLjMzNjMwNyIgeT0iMjY0LjMzNjYxIiBmb'
    + '250LXNpemU9IjMuNDc5OHB4IiBzdHJva2Utd2lkdGg9Ii4wODY5OTUiIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI'
    + '1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iMTIuMzM2MzA3IiB5PSIyNjQuMzM2NjEiIHN0cm9rZ'
    + 'S13aWR0aD0iLjA4Njk5NSI+5pys5Lq65biM5pyb6KiY5YWl5qyE77yI54m544Gr57Wm5paZ44O76IG356iu44O'
    + '75Yuk5YuZ5pmC6ZaT44O75Yuk5YuZ5Zyw44O744Gd44Gu5LuW44Gr44Gk44GE44Gm44Gu5biM5pyb44Gq44Gp4'
    + '4GM44GC44KM44Gw6KiY5YWl77yJPC90c3Bhbj48L3RleHQ+DQogPC9nPg0KPC9zdmc+DQo=';
    }
}