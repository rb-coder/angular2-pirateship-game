import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { GameStore } from './game-store';

import { State, Ship, Orientation } from './state';

@Component({
  moduleId: module.id,
  selector: 'ship',
  templateUrl: 'ship.component.html',
  styleUrls: ['ship.component.css']
})
export abstract class ShipComponent implements OnInit, OnDestroy {
  private stateSubscrption: Subscription;
  private ship: Ship;
  private orientationName: string;

  constructor(private gameStore: GameStore) { }

  ngOnInit(): void {
    this.stateSubscrption = this.gameStore
      .getState()
      .asObservable()
      .map((state: State) => this.extractShip(state))
      .distinctUntilChanged()
      .subscribe((state: Ship) => this.applyState(state));
  }

  ngOnDestroy(): void {
      if (this.stateSubscrption) {
          this.stateSubscrption.unsubscribe();
          this.stateSubscrption = null;
      }
  }

  private applyState(state: Ship): void {
    this.ship = state;
    this.orientationName = Orientation[this.ship.orientation];
  }

  protected abstract extractShip(state: State): Ship;
}
