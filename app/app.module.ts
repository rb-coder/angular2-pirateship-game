import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScoreComponent } from './score.component';
import { SeaComponent } from './sea.component';
import { PlayerShipComponent } from './player-ship.component';
import { PirateShipComponent } from './pirate-ship.component';

import { GameStore } from './game-store';
import { TimerService } from './timer.service';
import { ShipSpeedupService } from './ship-speedup.service';
import { PlayerShipControlService } from './player-ship-control.service';
import { PirateShipControlService } from './pirate-ship-control.service';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    ScoreComponent,
    SeaComponent,
    PlayerShipComponent,
    PirateShipComponent
  ],
  providers: [
    GameStore,
    TimerService,
    ShipSpeedupService,
    PlayerShipControlService,
    PirateShipControlService,
    { provide: Window,  useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
