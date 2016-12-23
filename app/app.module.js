"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var score_component_1 = require('./score.component');
var sea_component_1 = require('./sea.component');
var player_ship_component_1 = require('./player-ship.component');
var pirate_ship_component_1 = require('./pirate-ship.component');
var game_store_1 = require('./game-store');
var timer_service_1 = require('./timer.service');
var ship_speedup_service_1 = require('./ship-speedup.service');
var player_ship_control_service_1 = require('./player-ship-control.service');
var pirate_ship_control_service_1 = require('./pirate-ship-control.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule],
            declarations: [
                app_component_1.AppComponent,
                score_component_1.ScoreComponent,
                sea_component_1.SeaComponent,
                player_ship_component_1.PlayerShipComponent,
                pirate_ship_component_1.PirateShipComponent
            ],
            providers: [
                game_store_1.GameStore,
                timer_service_1.TimerService,
                ship_speedup_service_1.ShipSpeedupService,
                player_ship_control_service_1.PlayerShipControlService,
                pirate_ship_control_service_1.PirateShipControlService,
                { provide: Window, useValue: window }
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map