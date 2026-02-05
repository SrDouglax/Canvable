import { Vector2D } from "../../classes/Vector2D";
import { Scene } from "../Scene";
import { BoundingBox, CollisionResult } from "./BoundingBox";
import { SquareBoundingBox } from "./SquareBoundingBox";

export class CircleBoundingBox extends BoundingBox {
  radius: number;

  constructor(scene?: Scene, radius?: number) {
    super(scene);
    this.radius = radius || 10;
  }

  checkCollision(other: BoundingBox): CollisionResult {
    if (other instanceof CircleBoundingBox) {
      const dx = this.pos.x - other.pos.x;
      const dy = this.pos.y - other.pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.radius + other.radius) {
        const overlap = this.radius + other.radius - distance;
        const mtv = distance === 0
          ? new Vector2D(overlap, 0) // Overlapping exact centers
          : new Vector2D((dx / distance) * overlap, (dy / distance) * overlap);
        return { isColliding: true, mtv };
      }
    }

    if (other instanceof SquareBoundingBox) {
      // Find closest point on square to circle center
      const closestX = Math.max(other.pos.x - other.size.x / 2, Math.min(this.pos.x, other.pos.x + other.size.x / 2));
      const closestY = Math.max(other.pos.y - other.size.y / 2, Math.min(this.pos.y, other.pos.y + other.size.y / 2));

      const dx = this.pos.x - closestX;
      const dy = this.pos.y - closestY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.radius) {
        const overlap = this.radius - distance;
        const mtv = distance === 0
          ? new Vector2D(overlap, 0)
          : new Vector2D((dx / distance) * overlap, (dy / distance) * overlap);
        return { isColliding: true, mtv };
      }
    }

    return { isColliding: false };
  }

  isPointInside(_point: Vector2D): boolean {
    const point = this.scene?.camera.transformCoordinates(_point);
    if (!point) return false;
    const dx = this.pos.x - point.x;
    const dy = this.pos.y - point.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius;
  }
}
