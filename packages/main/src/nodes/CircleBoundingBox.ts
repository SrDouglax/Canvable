import { Scene, Vector2D } from "../main";
import { BoundingBox } from "./BoundingBox";

export class CircleBoundingBox extends BoundingBox {
  radius: number;

  constructor(scene?: Scene, radius?: number) {
    super(scene);
    this.radius = radius || 10;
  }

  checkCollision(other: BoundingBox): boolean {
    if (other instanceof CircleBoundingBox) {
      const thisPoint = this.scene?.camera.transformCoordinates(new Vector2D(this.pos.x, this.pos.y));
      const otherPoint = this.scene?.camera.transformCoordinates(new Vector2D(other.pos.x, other.pos.y));

      if (!thisPoint || !otherPoint) return false;

      const dx = thisPoint.x - otherPoint.x;
      const dy = thisPoint.y - otherPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < this.radius + other.radius;
    }

    // Adicione outras verificações de colisão aqui (com retângulos, polígonos, etc.)
    return false;
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
