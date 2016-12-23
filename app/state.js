"use strict";
var Position = (function () {
    function Position(top, left) {
        this.top = top;
        this.left = left;
    }
    Position.random = function () {
        return new Position(Math.round(100 * Math.random()), Math.round(500 * Math.random()));
    };
    Position.prototype.inspect = function () {
        return "{t:" + this.top + ",l:" + this.left + "}";
    };
    return Position;
}());
exports.Position = Position;
(function (Orientation) {
    Orientation[Orientation["North"] = 0] = "North";
    Orientation[Orientation["NorthEast"] = 1] = "NorthEast";
    Orientation[Orientation["East"] = 2] = "East";
    Orientation[Orientation["SouthEast"] = 3] = "SouthEast";
    Orientation[Orientation["South"] = 4] = "South";
    Orientation[Orientation["SouthWest"] = 5] = "SouthWest";
    Orientation[Orientation["West"] = 6] = "West";
    Orientation[Orientation["NorthWest"] = 7] = "NorthWest";
})(exports.Orientation || (exports.Orientation = {}));
var Orientation = exports.Orientation;
var Ship = (function () {
    function Ship(position, speed, orientation) {
        this.position = position;
        this.speed = speed;
        this.orientation = orientation;
    }
    Ship.randomPositioned = function () {
        return new Ship(Position.random(), Ship.START_SPEED, Orientation.South);
    };
    ;
    Ship.prototype.inspect = function () {
        return "{p:" + this.position + ",s:" + this.speed + "},o:" + this.orientation;
    };
    Ship.START_SPEED = 10;
    return Ship;
}());
exports.Ship = Ship;
var State = (function () {
    function State(seconds, playerShip, pirateShip, collision) {
        this.seconds = seconds;
        this.playerShip = playerShip;
        this.pirateShip = pirateShip;
        this.collision = collision;
    }
    State.prototype.inspect = function () {
        return "{t:" + this.seconds + ",player:" + this.playerShip + ",pirate:" + this.pirateShip + "}";
    };
    return State;
}());
exports.State = State;
//# sourceMappingURL=state.js.map