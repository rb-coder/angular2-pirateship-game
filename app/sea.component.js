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
var state_1 = require('./state');
var game_store_1 = require('./game-store');
var SeaComponent = (function () {
    function SeaComponent(gameStore) {
        this.gameStore = gameStore;
    }
    SeaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stateSubscription = this.gameStore
            .getState()
            .asObservable()
            .subscribe(function (state) { return _this.applyState(state); });
    };
    SeaComponent.prototype.applyState = function (state) {
        this.collision = state.collision;
        this.collisionPosition = new state_1.Position(Math.round((state.playerShip.position.top + state.pirateShip.position.top) / 2), Math.round((state.playerShip.position.left + state.pirateShip.position.left) / 2));
    };
    SeaComponent.prototype.ngOnDestroy = function () {
        this.stateSubscription.unsubscribe();
    };
    SeaComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sea',
            templateUrl: 'sea.component.html',
            styleUrls: ['sea.component.css']
        }), 
        __metadata('design:paramtypes', [game_store_1.GameStore])
    ], SeaComponent);
    return SeaComponent;
}());
exports.SeaComponent = SeaComponent;
//# sourceMappingURL=sea.component.js.map