import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs/Rx';
import { GameStore, Action, ActionType, Direction } from './game-store';

@Injectable()
export class PirateShipControlService {
  private timerSubscription: Subscription = null;

  constructor(private gameStore: GameStore) { }

  start(): void {
    if (!this.timerSubscription) {
      this.timerSubscription = Observable
        .timer(2000, 500)
        .subscribe(() => this.gameStore.performAction(Action.for(ActionType.PirateMove)));
    }
  }

  stop(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }
}
