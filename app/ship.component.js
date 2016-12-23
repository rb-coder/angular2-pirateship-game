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
var game_store_1 = require('./game-store');
var state_1 = require('./state');
var ShipComponent = (function () {
    function ShipComponent(gameStore) {
        this.gameStore = gameStore;
    }
    ShipComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stateSubscrption = this.gameStore
            .getState()
            .asObservable()
            .map(function (state) { return _this.extractShip(state); })
            .distinctUntilChanged()
            .subscribe(function (state) { return _this.applyState(state); });
    };
    ShipComponent.prototype.ngOnDestroy = function () {
        if (this.stateSubscrption) {
            this.stateSubscrption.unsubscribe();
            this.stateSubscrption = null;
        }
    };
    ShipComponent.prototype.applyState = function (state) {
        this.ship = state;
        this.orientationName = state_1.Orientation[this.ship.orientation];
    };
    ShipComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ship',
            templateUrl: 'ship.component.html',
            styleUrls: ['ship.component.css']
        }), 
        __metadata('design:paramtypes', [game_store_1.GameStore])
    ], ShipComponent);
    return ShipComponent;
}());
exports.ShipComponent = ShipComponent;
//# sourceMappingURL=ship.component.js.map