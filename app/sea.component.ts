import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { State, Position } from './state';
import { GameStore } from './game-store';

@Component({
  moduleId: module.id,
  selector: 'sea',
  templateUrl: 'sea.component.html',
  styleUrls: ['sea.component.css']
})
export class SeaComponent implements OnInit, OnDestroy {
  private stateSubscription: Subscription;
  private collision: boolean;
  private collisionPosition: Position;
  constructor(private gameStore: GameStore) {}

  ngOnInit(): void {
    this.stateSubscription = this.gameStore
      .getState()
      .asObservable()
      .subscribe((state: State) => this.applyState(state));
  }

  private applyState(state: State): void {
    this.collision = state.collision;
    this.collisionPosition = new Position(
      Math.round((state.playerShip.position.top + state.pirateShip.position.top) / 2),
      Math.round((state.playerShip.position.left + state.pirateShip.position.left) / 2));
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }
}
