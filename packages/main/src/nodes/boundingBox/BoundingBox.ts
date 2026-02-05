import { Vector2D } from "../../classes/Vector2D";
import { Node } from "../shapes/Node";

export interface CollisionResult {
  isColliding: boolean;
  mtv?: Vector2D;
}

export abstract class BoundingBox extends Node {
  abstract checkCollision(other: BoundingBox): CollisionResult;

  abstract isPointInside(_point: Vector2D): boolean;
}
