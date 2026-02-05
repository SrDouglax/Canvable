import { Vector2D } from "../../classes/Vector2D";
import { Scene } from "../Scene";
import { BoundingBox, CollisionResult } from "./BoundingBox";
import { CircleBoundingBox } from "./CircleBoundingBox";

export class SquareBoundingBox extends BoundingBox {
  size: Vector2D;

  constructor(scene?: Scene, size?: Vector2D) {
    super(scene);
    this.size = size || new Vector2D(10, 10);
  }

  checkCollision(other: BoundingBox): CollisionResult {
    if (other instanceof SquareBoundingBox) {
      const thisPoint = this.scene?.camera.transformCoordinates(new Vector2D(this.pos.x, this.pos.y));
      const otherPoint = this.scene?.camera.transformCoordinates(new Vector2D(other.pos.x, other.pos.y));

      if (!thisPoint || !otherPoint) return { isColliding: false };

      const dx = Math.abs(thisPoint.x - otherPoint.x);
      const dy = Math.abs(thisPoint.y - otherPoint.y);

      const halfWidths = (this.size.x + other.size.x) / 2;
      const halfHeights = (this.size.y + other.size.y) / 2;

      if (dx < halfWidths && dy < halfHeights) {
        const overlapX = halfWidths - dx;
        const overlapY = halfHeights - dy;

        if (overlapX < overlapY) {
          const mtvX = thisPoint.x < otherPoint.x ? -overlapX : overlapX;
          return { isColliding: true, mtv: new Vector2D(mtvX, 0) };
        } else {
          const mtvY = thisPoint.y < otherPoint.y ? -overlapY : overlapY;
          return { isColliding: true, mtv: new Vector2D(0, mtvY) };
        }
      }
    }

    if (other instanceof CircleBoundingBox) {
      // For Square vs Circle, we can delegate to Circle vs Square logic and invert the MTV
      const result = other.checkCollision(this);
      if (result.isColliding && result.mtv) {
        return { isColliding: true, mtv: new Vector2D(-result.mtv.x, -result.mtv.y) };
      }
    }

    return { isColliding: false };
  }

  isPointInside(_point: Vector2D): boolean {
    const x_inside = _point.x >= this.pos.x - this.size.x && _point.x <= this.pos.x + this.size.x;
    const y_inside = _point.y >= this.pos.y - this.size.y && _point.y <= this.pos.y + this.size.y;
    return x_inside && y_inside;
  }
}
