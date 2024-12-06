import { Vector2D } from "../main";
import { Node } from "./Node";

export abstract class BoundingBox extends Node {
  abstract checkCollision(other: BoundingBox): boolean;

  abstract isPointInside(_point: Vector2D): boolean;
}
