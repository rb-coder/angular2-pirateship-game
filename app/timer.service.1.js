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
var TimerService = (function () {
    function TimerService(gameStore) {
        this.gameStore = gameStore;
        this.timerSubscription = null;
    }
    TimerService.prototype.start = function () {
        var _this = this;
        if (this.timerSubscription) {
            throw new Error('Timer already started');
        }
        this.timerSubscription = Rx_1.Observable
            .timer(0, 1000)
            .subscribe(function (seconds) { return _this.gameStore.performAction(new game_store_1.Action(game_store_1.ActionType.Tick, seconds)); });
    };
    TimerService.prototype.stop = function () {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            this.timerSubscription = null;
        }
    };
    TimerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [game_store_1.GameStore])
    ], TimerService);
    return TimerService;
}());
exports.TimerService = TimerService;
//# sourceMappingURL=timer.service.1.js.map