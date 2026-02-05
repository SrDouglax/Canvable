import { Vector2D } from "../main";
import { Node } from "./shapes/Node";

export class Camera extends Node {
  zoom: number;

  constructor(zoom: number = 1) {
    super();
    this.zoom = zoom;
  }

  update(deltaTime: number): void {
    // Logic to update camera position, zoom, etc.
  }

  transformCoordinates(position: Vector2D): Vector2D {
    return new Vector2D((position.x - this.pos.x) * this.zoom, (position.y - this.pos.y) * this.zoom);
  }
}
