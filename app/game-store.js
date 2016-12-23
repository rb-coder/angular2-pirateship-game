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
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
(function (ActionType) {
    ActionType[ActionType["Init"] = 0] = "Init";
    ActionType[ActionType["Tick"] = 1] = "Tick";
    ActionType[ActionType["PlayerMove"] = 2] = "PlayerMove";
    ActionType[ActionType["PirateMove"] = 3] = "PirateMove";
    ActionType[ActionType["SpeedUp"] = 4] = "SpeedUp";
})(exports.ActionType || (exports.ActionType = {}));
var ActionType = exports.ActionType;
var Action = (function () {
    function Action(type, payload) {
        this.type = type;
        this.payload = payload;
    }
    Action.for = function (type, payload) {
        if (payload === void 0) { payload = null; }
        return new Action(type, payload);
    };
    return Action;
}());
exports.Action = Action;
var GameStore = (function () {
    function GameStore() {
        var _this = this;
        this.stateEmitter = new core_1.EventEmitter();
        this.actionEmitter = new core_1.EventEmitter();
        this.actionEmitter.asObservable().subscribe(function (action) { return _this.onNewAction(action); });
        this.performAction(Action.for(ActionType.Init));
    }
    GameStore.prototype.performAction = function (action) {
        this.actionEmitter.emit(action);
    };
    GameStore.prototype.getState = function () {
        return this.stateEmitter;
    };
    GameStore.prototype.onNewAction = function (action) {
        var actionHandler = "action" + ActionType[action.type];
        if (!this[actionHandler]) {
            console.error('Unknown action', action, actionHandler);
            return;
        }
        var stateUpdater = this[actionHandler]();
        var stateBefore = this.state;
        var stateAfter = stateUpdater(stateBefore, action.payload);
        this.state = stateAfter;
        this.stateEmitter.next(this.state);
    };
    GameStore.prototype.actionInit = function () {
        return function (state, payload) { return new state_1.State(0, state_1.Ship.randomPositioned(), state_1.Ship.randomPositioned(), false); };
    };
    GameStore.prototype.actionTick = function () {
        return function (state, seconds) {
            return new state_1.State(seconds, state.playerShip, state.pirateShip, state.collision);
        };
    };
    GameStore.prototype.newPosition = function (position, direction, speed) {
        switch (direction) {
            case Direction.Up:
                position = new state_1.Position(position.top - speed, position.left);
                break;
            case Direction.Down:
                position = new state_1.Position(position.top + speed, position.left);
                break;
            case Direction.Left:
                position = new state_1.Position(position.top, position.left - speed);
                break;
            case Direction.Right:
                position = new state_1.Position(position.top, position.left + speed);
                break;
        }
        return position;
    };
    GameStore.prototype.newOrientation = function (orientation, direction) {
        switch (direction) {
            case Direction.Up:
                switch (orientation) {
                    case state_1.Orientation.NorthEast:
                    case state_1.Orientation.NorthWest:
                        orientation = state_1.Orientation.North;
                        break;
                    case state_1.Orientation.South:
                        orientation = state_1.Orientation.SouthWest;
                        break;
                    case state_1.Orientation.SouthWest:
                        orientation = state_1.Orientation.West;
                        break;
                    case state_1.Orientation.West:
                        orientation = state_1.Orientation.NorthWest;
                        break;
                    case state_1.Orientation.SouthEast:
                        orientation = state_1.Orientation.South;
                        break;
                    case state_1.Orientation.East:
                        orientation = state_1.Orientation.NorthEast;
                        break;
                }
                break;
            case Direction.Down:
                switch (orientation) {
                    case state_1.Orientation.SouthEast:
                    case state_1.Orientation.SouthWest:
                        orientation = state_1.Orientation.South;
                        break;
                    case state_1.Orientation.North:
                        orientation = state_1.Orientation.NorthEast;
                        break;
                    case state_1.Orientation.NorthWest:
                        orientation = state_1.Orientation.West;
                        break;
                    case state_1.Orientation.West:
                        orientation = state_1.Orientation.SouthWest;
                        break;
                    case state_1.Orientation.NorthEast:
                        orientation = state_1.Orientation.East;
                        break;
                    case state_1.Orientation.East:
                        orientation = state_1.Orientation.SouthEast;
                        break;
                }
                break;
            case Direction.Left:
                switch (orientation) {
                    case state_1.Orientation.SouthWest:
                    case state_1.Orientation.NorthWest:
                        orientation = state_1.Orientation.West;
                        break;
                    case state_1.Orientation.East:
                        orientation = state_1.Orientation.SouthEast;
                        break;
                    case state_1.Orientation.SouthEast:
                        orientation = state_1.Orientation.South;
                        break;
                    case state_1.Orientation.South:
                        orientation = state_1.Orientation.SouthWest;
                        break;
                    case state_1.Orientation.NorthEast:
                        orientation = state_1.Orientation.North;
                        break;
                    case state_1.Orientation.North:
                        orientation = state_1.Orientation.NorthWest;
                        break;
                }
                break;
            case Direction.Right:
                switch (orientation) {
                    case state_1.Orientation.NorthEast:
                    case state_1.Orientation.SouthEast:
                        orientation = state_1.Orientation.East;
                        break;
                    case state_1.Orientation.West:
                        orientation = state_1.Orientation.NorthWest;
                        break;
                    case state_1.Orientation.SouthWest:
                        orientation = state_1.Orientation.South;
                        break;
                    case state_1.Orientation.South:
                        orientation = state_1.Orientation.SouthEast;
                        break;
                    case state_1.Orientation.NorthWest:
                        orientation = state_1.Orientation.North;
                        break;
                    case state_1.Orientation.North:
                        orientation = state_1.Orientation.NorthEast;
                        break;
                }
                break;
        }
        return orientation;
    };
    GameStore.prototype.isCollision = function (playerShipPosition, pirateShipPosition) {
        return Math.abs(playerShipPosition.top - pirateShipPosition.top)
            + Math.abs(playerShipPosition.left - pirateShipPosition.left) < 50;
    };
    GameStore.prototype.actionPlayerMove = function () {
        var _this = this;
        return function (state, direction) {
            var playerShip = new state_1.Ship(_this.newPosition(state.playerShip.position, direction, state.playerShip.speed), state.playerShip.speed, _this.newOrientation(state.playerShip.orientation, direction));
            var collision = _this.isCollision(playerShip.position, state.pirateShip.position);
            return new state_1.State(state.seconds, playerShip, state.pirateShip, collision);
        };
    };
    GameStore.prototype.getPirateDirection = function (pirateShipPosition, playerShipPosition) {
        var verticalDistance = playerShipPosition.top - pirateShipPosition.top;
        var horizontalDistance = playerShipPosition.left - pirateShipPosition.left;
        var direction;
        if (Math.abs(verticalDistance) > Math.abs(horizontalDistance)) {
            if (verticalDistance > 0) {
                direction = Direction.Down;
            }
            else {
                direction = Direction.Up;
            }
        }
        else {
            if (horizontalDistance > 0) {
                direction = Direction.Right;
            }
            else {
                direction = Direction.Left;
            }
        }
        return direction;
    };
    GameStore.prototype.actionPirateMove = function () {
        var _this = this;
        return function (state) {
            var direction = _this.getPirateDirection(state.pirateShip.position, state.playerShip.position);
            var pirateShip = new state_1.Ship(_this.newPosition(state.pirateShip.position, direction, state.playerShip.speed), state.playerShip.speed, _this.newOrientation(state.pirateShip.orientation, direction));
            var collision = _this.isCollision(state.playerShip.position, pirateShip.position);
            return new state_1.State(state.seconds, state.playerShip, pirateShip, collision);
        };
    };
    GameStore.prototype.actionSpeedUp = function () {
        return function (state) {
            var pirateShipSpeed = state.pirateShip.speed + 1;
            return new state_1.State(state.seconds, new state_1.Ship(state.playerShip.position, state.playerShip.speed, state.playerShip.orientation), new state_1.Ship(state.pirateShip.position, pirateShipSpeed, state.pirateShip.orientation), state.collision);
        };
    };
    GameStore = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GameStore);
    return GameStore;
}());
exports.GameStore = GameStore;
//# sourceMappingURL=game-store.js.map