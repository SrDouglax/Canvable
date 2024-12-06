import { Vector2D } from "../classes/Vector2D";
import { BoundingBox } from "./BoundingBox";
import { CircleBoundingBox } from "./CircleBoundingBox";
import { Node } from "./Node";
import { Scene } from "./Scene";

export interface CircleConfig {
  vel?: Vector2D;
  size?: number;
  friction?: number;
  startsWithBoundingBox?: boolean;
}

export class Circle extends Node {
  vel = new Vector2D();
  size = 10;
  friction = 0.1;
  boundingBox: BoundingBox = new CircleBoundingBox(this.scene, this.size);

  constructor(scene?: Scene, config?: CircleConfig) {
    super(scene);
    this.vel = config?.vel || new Vector2D();
    this.size = config?.size || 10;
    this.friction = config?.friction || 0.1;

    if (config?.startsWithBoundingBox) {
      this.boundingBox = new CircleBoundingBox(scene, this.size);
      this.addObject(this.boundingBox);
    }
  }

  draw(ctx: CanvasRenderingContext2D, selected?: boolean) {
    const cameraPos = this.scene?.camera.pos || new Vector2D();
    const cameraScale = this.scene?.camera.zoom || 1;
    const relativePos = new Vector2D((this.pos.x - cameraPos.x) * cameraScale, (this.pos.y - cameraPos.y) * cameraScale);

    if (selected) {
      ctx.beginPath();
      ctx.arc(relativePos.x, relativePos.y, this.size + 5, 0, Math.PI * 2);
      ctx.fillStyle = "transparent";
      ctx.lineWidth = 3;
      ctx.strokeStyle = "white";
      ctx.stroke();
      ctx.closePath();
    }

    // Draw the circle
    ctx.beginPath();
    ctx.arc(relativePos.x, relativePos.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }
}
