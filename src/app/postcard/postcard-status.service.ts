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
        postcode: '',
        address: '',
        address2: '',
        building: '',
        company: '',
        department: '',
        name1: '',
        name2: '',
        title: '',
        myPostcode: '',
        myAddress: '',
        myBuilding: '',
        myName: '',
    };
    inputForm = {
        postcode: true,
        address: true,
        address2: false,
        building: false,
        company: false,
        department: false,
        name1: true,
        name2: false,
        title: false,
        myPostcode: false,
        myAddress: false,
        myBuilding: false,
        myName: false
    };

    constructor() {}

}
