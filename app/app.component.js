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
var timer_service_1 = require('./timer.service');
var ship_speedup_service_1 = require('./ship-speedup.service');
var AppComponent = (function () {
    function AppComponent(gameStore, timerService, shipSppedupService) {
        this.gameStore = gameStore;
        this.timerService = timerService;
        this.shipSppedupService = shipSppedupService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.timerService.start();
        this.shipSppedupService.start();
        this.stateSubscription = this.gameStore
            .getState()
            .asObservable()
            .map(function (state) { return state.collision; })
            .filter(function (collison) { return collison; })
            .subscribe(function (collision) { return _this.ngOnDestroy(); });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.timerService.stop();
        this.shipSppedupService.stop();
        this.stateSubscription.unsubscribe();
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app',
            templateUrl: 'app.component.html'
        }), 
        __metadata('design:paramtypes', [game_store_1.GameStore, timer_service_1.TimerService, ship_speedup_service_1.ShipSpeedupService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map