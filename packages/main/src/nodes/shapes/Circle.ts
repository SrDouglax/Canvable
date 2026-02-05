import { Vector2D } from "../../classes/Vector2D";
import { CircleBoundingBox } from "../boundingBox/CircleBoundingBox";
import { Scene } from "../Scene";
import { Node } from "./Node";

export interface CircleConfig {
  vel?: Vector2D;
  size?: number;
  friction?: number;
  startsWithBoundingBox?: boolean;
  style?: { fillStyle?: string; strokeStyle?: string; lineWidth?: number };
}

export class Circle extends Node {
  vel = new Vector2D();
  size = 10;
  friction = 0.1;

  style: { fillStyle?: string; strokeStyle?: string; lineWidth?: number } = {
    fillStyle: "blue",
  };

  constructor(scene?: Scene, config?: CircleConfig) {
    super(scene);
    this.vel = config?.vel || new Vector2D();
    this.size = config?.size || 10;
    this.friction = config?.friction || 0.1;
    this.style = { ...this.style, ...config?.style };

    if (config?.startsWithBoundingBox) {
      this.boundingBox = new CircleBoundingBox(scene, this.size);
      this.addObject(this.boundingBox);
    }
  }

  update(_deltaTime: number): void {
    if (this.boundingBox) {
      this.boundingBox.pos = this.pos;
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
    ctx.fillStyle = this.style.fillStyle || "blue";
    ctx.fill();

    if (this.style.strokeStyle) {
      ctx.strokeStyle = this.style.strokeStyle;
      ctx.lineWidth = this.style.lineWidth || 1;
      ctx.stroke();
    }

    ctx.closePath();
  }
}
