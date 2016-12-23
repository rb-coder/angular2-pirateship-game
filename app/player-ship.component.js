"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var player_ship_control_service_1 = require('./player-ship-control.service');
var game_store_1 = require('./game-store');
var ship_component_1 = require('./ship.component');
var PlayerShipComponent = (function (_super) {
    __extends(PlayerShipComponent, _super);
    function PlayerShipComponent(playerShipControlService, gameStore) {
        _super.call(this, gameStore);
        this.playerShipControlService = playerShipControlService;
    }
    PlayerShipComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.playerShipControlService.start();
    };
    PlayerShipComponent.prototype.extractShip = function (state) {
        return state.playerShip;
    };
    PlayerShipComponent.prototype.ngOnDestroy = function () {
        this.playerShipControlService.stop();
        _super.prototype.ngOnDestroy.call(this);
    };
    PlayerShipComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'player-ship',
            templateUrl: 'ship.component.html',
            styleUrls: ['ship.component.css', 'player-ship.component.css']
        }), 
        __metadata('design:paramtypes', [player_ship_control_service_1.PlayerShipControlService, game_store_1.GameStore])
    ], PlayerShipComponent);
    return PlayerShipComponent;
}(ship_component_1.ShipComponent));
exports.PlayerShipComponent = PlayerShipComponent;
//# sourceMappingURL=player-ship.component.js.map