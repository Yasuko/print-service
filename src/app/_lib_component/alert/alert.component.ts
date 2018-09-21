import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { fadeInAnimation, alertAnimation } from '../../_lib_service/index';
import { SubjectsService } from '../../service/index';

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.scss'],
    animations: [ alertAnimation ],
})

export class AlertComponent implements OnInit {

    alert = 'hide';
    alertMessage = '';

    subscription: Subscription;
    constructor(
        private subjectsService: SubjectsService,
    ) {
    }

    ngOnInit(): void {
        this.alertCheck();
    }
    alertCheck(): void {
        this.subjectsService
            .on('alert')
            .subscribe((mess) => {
                this.alertMessage = mess;
                this.setupAlert();
            });
    }
    /**
     * アラート画面表示
     * @param message
     */
    setupAlert(): void {
        this.alert = 'show';
        setTimeout(() => {
            this.alert = 'hide';
            this.alertMessage = '';
        }, 2000);
    }

}
