import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { GameStore, Action, ActionType } from './game-store';

@Injectable()
export class TimerService {
    private timerSubscription: Subscription = null;

    constructor(private gameStore: GameStore) { }

    start(): void {
        if (!this.timerSubscription) {
            this.timerSubscription = Observable
                .timer(0, 1000)
                .subscribe((seconds: number) => this.gameStore.performAction(Action.for(ActionType.Tick, seconds)));
        }
    }

    stop(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            this.timerSubscription = null;
        }
    }
}


