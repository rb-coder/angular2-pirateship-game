import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { GameStore, Action, ActionType } from './game-store';

@Injectable()
export class ShipSpeedupService {
    private timerSubscription: Subscription = null;

    constructor(private gameStore: GameStore) { }

    start(): void {
        if (!this.timerSubscription) {
            this.timerSubscription = Observable
                .timer(10000, 5000)
                .subscribe(() => this.gameStore.performAction(Action.for(ActionType.SpeedUp)));
        }
    }

    stop(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            this.timerSubscription = null;
        }
    }
}


