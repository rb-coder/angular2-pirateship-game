import { Injectable, EventEmitter } from '@angular/core';

import { State, Ship, Position, Orientation } from './state';

export enum Direction {
    Up, Right, Down, Left
}

export enum ActionType {
    Init, Tick, PlayerMove, PirateMove, SpeedUp
}

export class Action {
    static for(type: ActionType, payload: any = null): Action {
        return new Action(type, payload);
    }
    constructor(public type: ActionType, public payload: any) { }
}

export interface ActionReceiver {
    performAction(action: Action): void;
}

export interface StateEmitter {
    getState(): EventEmitter<State>;
}

@Injectable()
export class GameStore implements ActionReceiver, StateEmitter {

    private state: State;
    private stateEmitter: EventEmitter<State>;
    private actionEmitter: EventEmitter<Action>;

    constructor() {
        this.stateEmitter = new EventEmitter<State>();
        this.actionEmitter = new EventEmitter<Action>();

        this.actionEmitter.asObservable().subscribe((action: Action) => this.onNewAction(action));

        this.performAction(Action.for(ActionType.Init));
    }

    public performAction(action: Action): void {
        this.actionEmitter.emit(action);
    }

    public getState(): EventEmitter<State> {
        return this.stateEmitter;
    }

    private onNewAction(action: Action): void {
        const actionHandler = `action${ActionType[action.type]}`;

        if (!this[actionHandler]) {
            console.error('Unknown action', action, actionHandler);
            return;
        }

        const stateUpdater = this[actionHandler]();
        const stateBefore: State = this.state;
        const stateAfter: State = stateUpdater(stateBefore, action.payload);

        this.state = stateAfter;
        this.stateEmitter.next(this.state);
    }

    private actionInit(): Function {
        return (state: State, payload: any): State => new State(0, Ship.randomPositioned(), Ship.randomPositioned(), false);
    }

    private actionTick(): Function {
        return (state: State, seconds: number): State => {
            return new State(seconds, state.playerShip, state.pirateShip, state.collision);
        };
    }

    private newPosition(position: Position, direction: Direction, speed: number): Position {
        switch (direction) {
            case Direction.Up:
                position = new Position(position.top - speed, position.left);
                break;
            case Direction.Down:
                position = new Position(position.top + speed, position.left);
                break;
            case Direction.Left:
                position = new Position(position.top, position.left - speed);
                break;
            case Direction.Right:
                position = new Position(position.top, position.left + speed);
                break;
        }
        return position;
    }

    private newOrientation(orientation: Orientation, direction: Direction): Orientation {
        switch (direction) {
            case Direction.Up:
                switch (orientation) {
                    case Orientation.NorthEast:
                    case Orientation.NorthWest:
                        orientation = Orientation.North;
                    break;
                    case Orientation.South:
                        orientation = Orientation.SouthWest;
                        break;
                    case Orientation.SouthWest:
                        orientation = Orientation.West;
                        break;
                    case Orientation.West:
                        orientation = Orientation.NorthWest;
                    break;
                    case Orientation.SouthEast:
                        orientation = Orientation.South;
                        break;
                    case Orientation.East:
                        orientation = Orientation.NorthEast;
                    break;
                }
                break;
            case Direction.Down:
                switch (orientation) {
                    case Orientation.SouthEast:
                    case Orientation.SouthWest:
                        orientation = Orientation.South;
                    break;
                    case Orientation.North:
                        orientation = Orientation.NorthEast;
                        break;
                    case Orientation.NorthWest:
                        orientation = Orientation.West;
                        break;
                    case Orientation.West:
                        orientation = Orientation.SouthWest;
                    break;
                    case Orientation.NorthEast:
                        orientation = Orientation.East;
                        break;
                    case Orientation.East:
                        orientation = Orientation.SouthEast;
                    break;
                }
                break;
            case Direction.Left:
                switch (orientation) {
                    case Orientation.SouthWest:
                    case Orientation.NorthWest:
                        orientation = Orientation.West;
                    break;
                    case Orientation.East:
                        orientation = Orientation.SouthEast;
                        break;
                    case Orientation.SouthEast:
                        orientation = Orientation.South;
                        break;
                    case Orientation.South:
                        orientation = Orientation.SouthWest;
                    break;
                    case Orientation.NorthEast:
                        orientation = Orientation.North;
                        break;
                    case Orientation.North:
                        orientation = Orientation.NorthWest;
                    break;
                }
                break;
            case Direction.Right:
                switch (orientation) {
                    case Orientation.NorthEast:
                    case Orientation.SouthEast:
                        orientation = Orientation.East;
                    break;
                    case Orientation.West:
                        orientation = Orientation.NorthWest;
                        break;
                    case Orientation.SouthWest:
                        orientation = Orientation.South;
                        break;
                    case Orientation.South:
                        orientation = Orientation.SouthEast;
                    break;
                    case Orientation.NorthWest:
                        orientation = Orientation.North;
                        break;
                    case Orientation.North:
                        orientation = Orientation.NorthEast;
                    break;
                }
                break;
        }
        return orientation;
    }

    private isCollision(playerShipPosition: Position, pirateShipPosition: Position): boolean {
        return Math.abs(playerShipPosition.top - pirateShipPosition.top)
                + Math.abs(playerShipPosition.left - pirateShipPosition.left) < 50;
    }

    private actionPlayerMove(): Function {
        return (state: State, direction: Direction) => {
            const playerShip: Ship = new Ship(
                this.newPosition(state.playerShip.position, direction, state.playerShip.speed),
                state.playerShip.speed,
                this.newOrientation(state.playerShip.orientation, direction));
            const collision = this.isCollision(playerShip.position, state.pirateShip.position);

            return new State(state.seconds, playerShip, state.pirateShip, collision);
        };
    }

    private getPirateDirection(pirateShipPosition: Position, playerShipPosition: Position): Direction {
        const verticalDistance: number = playerShipPosition.top - pirateShipPosition.top;
        const horizontalDistance: number = playerShipPosition.left - pirateShipPosition.left;
        let direction: Direction;

        if (Math.abs(verticalDistance) > Math.abs(horizontalDistance)) {
            if (verticalDistance > 0) {
                direction = Direction.Down;
            } else {
                direction = Direction.Up;
            }
        } else {
            if (horizontalDistance > 0) {
                direction = Direction.Right;
            } else {
                direction = Direction.Left;
            }
        }

        return direction;
    }

    private actionPirateMove(): Function {
        return (state: State) => {
            const direction: Direction = this.getPirateDirection(state.pirateShip.position, state.playerShip.position);

            const pirateShip: Ship = new Ship(
                this.newPosition(state.pirateShip.position, direction, state.playerShip.speed),
                state.playerShip.speed,
                this.newOrientation(state.pirateShip.orientation, direction));
            const collision = this.isCollision(state.playerShip.position, pirateShip.position);

            return new State(state.seconds, state.playerShip, pirateShip, collision);
        };
    }

    private actionSpeedUp(): Function {
        return (state: State) => {
            let pirateShipSpeed: number = state.pirateShip.speed + 1;

            return new State(
                state.seconds,
                new Ship(state.playerShip.position, state.playerShip.speed, state.playerShip.orientation),
                new Ship(state.pirateShip.position, pirateShipSpeed, state.pirateShip.orientation),
                state.collision);
        };
    }
}
