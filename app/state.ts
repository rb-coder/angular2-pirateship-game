export class Position {
    static random(): Position {
        return new Position(Math.round(100 * Math.random()), Math.round(500 * Math.random()));
    }

    constructor(public top: number, public left: number) { }

    public inspect(): string {
        return `{t:${this.top},l:${this.left}}`;
    }
}

export enum Orientation {
    North, NorthEast, East, SouthEast, South, SouthWest, West, NorthWest
}

export class Ship {
    private static START_SPEED: number = 10;
    static randomPositioned(): Ship {
        return new Ship(Position.random(), Ship.START_SPEED, Orientation.South);
    }
    constructor(public position: Position, public speed: number, public orientation: Orientation) { };

    public inspect(): string {
        return `{p:${this.position},s:${this.speed}},o:${this.orientation}`;
    }
}

export class State {
    constructor(
        public seconds: number,
        public playerShip: Ship,
        public pirateShip: Ship,
        public collision: boolean) {}

    public inspect(): string {
        return `{t:${this.seconds},player:${this.playerShip},pirate:${this.pirateShip}}`;
    }
}