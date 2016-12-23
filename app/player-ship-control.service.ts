import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs/Rx';
import { GameStore, Action, ActionType, Direction } from './game-store';

@Injectable()
export class PlayerShipControlService {
  private started: boolean = false;
  private keyDownSubscription: Subscription = null;
  private keyUpSubscription: Subscription = null;
  private directions: Direction[] = [];

  constructor(private gameStore: GameStore, private target: Window) { }

  start(): void {
    if (!this.started) {
      this.keyDownSubscription = Observable
        .fromEvent(this.target, 'keydown')
        .map((event: KeyboardEvent) => this.extractKeyCode(event))
        .filter((keyCode: number) => this.filterArrows(keyCode))
        .map((keyCode: number) => this.keyCodeToDirection(keyCode))
        .subscribe((direction: Direction) => this.addDirection(direction));

      this.keyUpSubscription = Observable
        .fromEvent(this.target, 'keyup')
        .map((event: KeyboardEvent) => this.extractKeyCode(event))
        .filter((keyCode: number) => this.filterArrows(keyCode))
        .map((keyCode: number) => this.keyCodeToDirection(keyCode))
        .subscribe((direction: Direction) => this.removeDirection(direction));
    }
  }

  extractKeyCode(event: KeyboardEvent): number {
    return event.keyCode;
  }

  filterArrows(keyCode: number): boolean {
    switch (keyCode) {
      case 38: // up
      case 87: // w
      case 40: // right
      case 68: // d
      case 37: // down
      case 83: // s
      case 39: // left
      case 65: // a
        return true;
    }
    return false;
  }

  keyCodeToDirection(keyCode: number): Direction {
    switch (keyCode) {
      case 38: // up
      case 87: // w
        return Direction.Up;
      case 39: // right
      case 68: // d
        return Direction.Right;
      case 40: // down
      case 83: // s
        return Direction.Down;
      case 37: // left
      case 65: // a
        return Direction.Left;
    }
    throw new Error(`Unknown key: ${keyCode}`);
  }

  sendAction() {
    this.directions.forEach((direction: Direction) => this.gameStore.performAction(Action.for(ActionType.PlayerMove, direction)));
  }

  addDirection(direction: Direction) {
    if (this.directions.indexOf(direction) < 0) {
      this.directions.push(direction);
    }
    this.sendAction();
  }

  removeDirection(direction: Direction) {
    this.directions = this.directions.filter((dir: Direction) => dir !== direction);
    this.sendAction();
  }

  stop(): void {
    if (this.started) {
      this.started = false;

      if (this.keyDownSubscription) {
        this.keyDownSubscription.unsubscribe();
        this.keyDownSubscription = null;
      }

      if (this.keyUpSubscription) {
        this.keyUpSubscription.unsubscribe();
        this.keyUpSubscription = null;
      }
    }
  }
}
