import { Vector2D } from "../main";
import { Node } from "./shapes/Node";

export class InputManager extends Node {
  private keyState: Map<string, boolean> = new Map();
  private keyJustPressed: Set<string> = new Set();
  private mouseState: Map<number, boolean> = new Map();
  private mouseJustPressed: Set<number> = new Set();
  public mousePos: Vector2D = new Vector2D();

  constructor() {
    super();
    this.setupListeners();
  }

  private setupListeners() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
    window.addEventListener("mousedown", this.handleMouseDown.bind(this));
    window.addEventListener("mouseup", this.handleMouseUp.bind(this));
    window.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  private handleMouseMove(event: MouseEvent) {
    this.mousePos = new Vector2D(event.clientX, event.clientY);
  }

  private handleKeyDown(event: KeyboardEvent) {
    const key = event.code;
    if (!this.keyState.get(key)) {
      this.keyState.set(key, true);
      this.keyJustPressed.add(key);
    }
  }

  private handleKeyUp(event: KeyboardEvent) {
    const key = event.code;
    this.keyState.set(key, false);
    this.keyJustPressed.delete(key);
  }

  private handleMouseDown(event: MouseEvent) {
    const button = event.button;
    if (!this.mouseState.get(button)) {
      this.mouseState.set(button, true);
      this.mouseJustPressed.add(button);
    }
  }

  private handleMouseUp(event: MouseEvent) {
    const button = event.button;
    this.mouseState.set(button, false);
    this.mouseJustPressed.delete(button);
  }

  justPressed(keyOrButton: string | number): boolean {
    if (typeof keyOrButton === "string") {
      return this.keyJustPressed.has(keyOrButton);
    } else if (typeof keyOrButton === "number") {
      return this.mouseJustPressed.has(keyOrButton);
    }
    return false;
  }

  isPressed(keyOrButton: string | number): boolean {
    if (typeof keyOrButton === "string") {
      return !!this.keyState.get(keyOrButton);
    } else if (typeof keyOrButton === "number") {
      return !!this.mouseState.get(keyOrButton);
    }
    return false;
  }

  postUpdate(): void {
    this.keyJustPressed.clear();
    this.mouseJustPressed.clear();
  }
}
