import { Component, OnInit, OnDestroy } from '@angular/core';

import { PlayerShipControlService } from './player-ship-control.service';

import { State, Ship } from './state';
import { GameStore } from './game-store';

import { ShipComponent } from './ship.component';

@Component({
  moduleId: module.id,
  selector: 'player-ship',
  templateUrl: 'ship.component.html',
  styleUrls: ['ship.component.css', 'player-ship.component.css']
})
export class PlayerShipComponent extends ShipComponent implements OnInit, OnDestroy {
  constructor(private playerShipControlService: PlayerShipControlService, gameStore: GameStore) {
    super(gameStore);
   }

   ngOnInit(): void {
     super.ngOnInit();
     this.playerShipControlService.start();
   }

   protected extractShip(state: State): Ship {
     return state.playerShip;
   }

   ngOnDestroy(): void {
     this.playerShipControlService.stop();
     super.ngOnDestroy();
   }
}
