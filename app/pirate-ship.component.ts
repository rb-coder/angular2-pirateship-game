import { Component, OnInit, OnDestroy } from '@angular/core';

import { PirateShipControlService } from './pirate-ship-control.service';

import { State, Ship } from './state';
import { GameStore } from './game-store';

import { ShipComponent } from './ship.component';

@Component({
  moduleId: module.id,
  selector: 'pirate-ship',
  templateUrl: 'ship.component.html',
  styleUrls: ['ship.component.css', 'pirate-ship.component.css']
})
export class PirateShipComponent extends ShipComponent implements OnInit, OnDestroy {
  constructor(private pirateShipControlService: PirateShipControlService, gameStore: GameStore) {
    super(gameStore);
   }

   ngOnInit(): void {
     super.ngOnInit();
     this.pirateShipControlService.start();
   }

   protected extractShip(state: State): Ship {
     return state.pirateShip;
   }

   ngOnDestroy(): void {
     this.pirateShipControlService.stop();
     super.ngOnDestroy();
   }
}
