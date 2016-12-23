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
var ScoreComponent = (function () {
    function ScoreComponent(gameStore) {
        this.gameStore = gameStore;
    }
    ScoreComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stateSubscrption = this.gameStore
            .getState()
            .asObservable()
            .map(function (state) { return state.seconds; })
            .distinctUntilChanged()
            .subscribe(function (state) { return _this.playTime = state; });
    };
    ScoreComponent.prototype.ngOnDestroy = function () {
        if (this.stateSubscrption) {
            this.stateSubscrption.unsubscribe();
            this.stateSubscrption = null;
        }
    };
    ScoreComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'score',
            templateUrl: 'score.component.html',
            styleUrls: ['score.component.css']
        }), 
        __metadata('design:paramtypes', [game_store_1.GameStore])
    ], ScoreComponent);
    return ScoreComponent;
}());
exports.ScoreComponent = ScoreComponent;
//# sourceMappingURL=score.component.js.map