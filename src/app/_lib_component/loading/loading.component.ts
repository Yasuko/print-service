import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { fadeInAnimation } from '../../_lib_service/index';
import { SubjectsService } from '../../service/index';

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.scss'],
    animations: [ fadeInAnimation ],
})

export class LoadingComponent implements OnInit {

    loader = 'default';
    loadMessage = '読み込み中';

    subscription: Subscription;
    constructor(
        private subjectsService: SubjectsService,
    ) {
    }

    ngOnInit(): void {
        this.loadScreen();
    }
    loadScreen(): void {
        this.subjectsService
            .on('load')
            .subscribe((mess) => {
                if (mess === 'show') {
                    this.loader = 'loading';
                } else {
                    this.loader = 'loadend';
                }
            });
    }
}
