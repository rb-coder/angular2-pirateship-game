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
var Rx_1 = require('rxjs/Rx');
var game_store_1 = require('./game-store');
var PlayerShipControlService = (function () {
    function PlayerShipControlService(gameStore, target) {
        this.gameStore = gameStore;
        this.target = target;
        this.keyDownSubscription = null;
    }
    PlayerShipControlService.prototype.start = function () {
        var _this = this;
        if (!this.keyDownSubscription) {
            this.keyDownSubscription = Rx_1.Observable
                .fromEvent(this.target, 'keyup')
                .map(function (event) { return _this.extractKeyCode(event); })
                .filter(function (keyCode) { return _this.filterArrows(keyCode); })
                .map(function (keyCode) { return _this.keyCodeToAction(keyCode); })
                .subscribe(function (action) { return _this.gameStore.performAction(action); });
        }
    };
    PlayerShipControlService.prototype.extractKeyCode = function (event) {
        return event.keyCode;
    };
    PlayerShipControlService.prototype.filterArrows = function (keyCode) {
        switch (keyCode) {
            case 38: // up
            case 87: // w
            case 40: // right
            case 68: // d
            case 37: // down
            case 83: // s
            case 39: // left
            case 65:
                return true;
        }
        return false;
    };
    PlayerShipControlService.prototype.keyCodeToAction = function (keyCode) {
        switch (keyCode) {
            case 38: // up
            case 87:
                return new game_store_1.Action(game_store_1.ActionType.PlayerMove, game_store_1.Direction.Up);
            case 39: // right
            case 68:
                return new game_store_1.Action(game_store_1.ActionType.PlayerMove, game_store_1.Direction.Right);
            case 40: // down
            case 83:
                return new game_store_1.Action(game_store_1.ActionType.PlayerMove, game_store_1.Direction.Down);
            case 37: // left
            case 65:
                return new game_store_1.Action(game_store_1.ActionType.PlayerMove, game_store_1.Direction.Left);
        }
        throw new Error("Unknown key: " + keyCode);
    };
    PlayerShipControlService.prototype.stop = function () {
        if (this.keyDownSubscription) {
            this.keyDownSubscription.unsubscribe();
            this.keyDownSubscription = null;
        }
    };
    PlayerShipControlService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [game_store_1.GameStore, Window])
    ], PlayerShipControlService);
    return PlayerShipControlService;
}());
exports.PlayerShipControlService = PlayerShipControlService;
//# sourceMappingURL=player-ship-control.service.1.js.map