import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { State } from './state';
import { GameStore } from './game-store';

@Component({
    moduleId: module.id,
    selector: 'score',
    templateUrl: 'score.component.html',
    styleUrls: [ 'score.component.css' ]
})
export class ScoreComponent implements OnInit, OnDestroy {
    private stateSubscrption: Subscription;
    private playTime: number;
    constructor(private gameStore: GameStore) { }

    ngOnInit(): void {
        this.stateSubscrption = this.gameStore
            .getState()
            .asObservable()
            .map((state: State) => state.seconds)
            .distinctUntilChanged()
            .subscribe((state: number) => this.playTime = state);
     }

     ngOnDestroy(): void {
         if (this.stateSubscrption) {
             this.stateSubscrption.unsubscribe();
             this.stateSubscrption = null;
         }
     }
}