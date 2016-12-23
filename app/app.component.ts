import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { State } from './state';
import { GameStore } from './game-store';
import { TimerService } from './timer.service';
import { ShipSpeedupService } from './ship-speedup.service';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private stateSubscription: Subscription;
  constructor(
    private gameStore: GameStore,
    private timerService: TimerService,
    private shipSppedupService: ShipSpeedupService) {}

  ngOnInit(): void {
    this.timerService.start();
    this.shipSppedupService.start();

    this.stateSubscription = this.gameStore
      .getState()
      .asObservable()
      .map((state: State) => state.collision)
      .filter((collison: boolean) => collison)
      .subscribe((collision: boolean) => this.ngOnDestroy());
  }

  ngOnDestroy(): void {
    this.timerService.stop();
    this.shipSppedupService.stop();
    this.stateSubscription.unsubscribe();
  }
 }
