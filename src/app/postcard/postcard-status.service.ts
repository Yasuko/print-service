import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PostcardStatusService {

    flags = {
        onDrag: false,
        onType: true,
        onSheetDesine: false,
        onNameTitle: false,
        onLoadCSV: false,
        onIncludeCSV: false,
            onDragCSVFile: true,
            onPreviewCSVFile: false,
        onInputContents: false,
        onReviewCSV: false,
        onDownload: false,
        onLoad: false,
        onFileLoad: false,
            onFiles: true,
            onReview: true
    };

    desineFlagsAddress = {
        address1: false,
        address2: false,
        address3: false
    };
    desineFlagsCompany = {
        company1: false,
        company2: false
    };
    desineFlagsName = {
        twice: false,
        myName: false
    };
    printSheetDesine = '';
    formStatus = {
        postcode: '6711104',
        address1: '兵庫県姫路市広畑区才',
        address2: '６２９－８',
        building: 'ももりやん亭',
        company: '',
        department: '',
        name1: '守屋　雅之',
        name2: '',
        title: '',
        myPostcode: '',
        myAddress: '',
        myBuilding: '',
        myName: '',
    };
    inputForm = {
        company: false,
        name2: false,
        title: false,
        myAddress: false,
    };
    nameTitles = {
        0: ['様', false],
        1: ['殿', false],
        2: ['先生', false],
        3: ['御中', false],
        4: ['各位', false],
        5: ['行', false]
    };

    constructor() {}

}
