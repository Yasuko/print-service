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
        postcode: '1234567',
        address1: '兵庫県神戸市中央区',
        address2: '1234-1',
        building: 'もの凄いビル',
        name1: 'どっかのだれか',
        name2: 'どっかとだれか',
        title: '',
        company: '破れない商事',
        department: '引き裂かない課',
        myPostcode: '1234567',
        myAddress: '兵庫県神戸市中央区',
        myBuilding: '空前絶後のアパート',
        myName: 'どこぞのだれか',
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
