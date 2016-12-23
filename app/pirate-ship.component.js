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
var pirate_ship_control_service_1 = require('./pirate-ship-control.service');
var game_store_1 = require('./game-store');
var ship_component_1 = require('./ship.component');
var PirateShipComponent = (function (_super) {
    __extends(PirateShipComponent, _super);
    function PirateShipComponent(pirateShipControlService, gameStore) {
        _super.call(this, gameStore);
        this.pirateShipControlService = pirateShipControlService;
    }
    PirateShipComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.pirateShipControlService.start();
    };
    PirateShipComponent.prototype.extractShip = function (state) {
        return state.pirateShip;
    };
    PirateShipComponent.prototype.ngOnDestroy = function () {
        this.pirateShipControlService.stop();
        _super.prototype.ngOnDestroy.call(this);
    };
    PirateShipComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pirate-ship',
            templateUrl: 'ship.component.html',
            styleUrls: ['ship.component.css', 'pirate-ship.component.css']
        }), 
        __metadata('design:paramtypes', [pirate_ship_control_service_1.PirateShipControlService, game_store_1.GameStore])
    ], PirateShipComponent);
    return PirateShipComponent;
}(ship_component_1.ShipComponent));
exports.PirateShipComponent = PirateShipComponent;
//# sourceMappingURL=pirate-ship.component.js.map