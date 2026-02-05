import { Vector2D } from "../../classes/Vector2D";
import { SquareBoundingBox } from "../boundingBox/SquareBoundingBox";
import { Scene } from "../Scene";
import { Node } from "./Node";

export interface SquareConfig {
  vel?: Vector2D;
  size?: Vector2D;
  friction?: number;
  startsWithBoundingBox?: boolean;
  style?: { fillStyle?: string; strokeStyle?: string; lineWidth?: number };
}

export class Square extends Node {
  vel = new Vector2D();
  size: Vector2D;
  friction = 0.1;

  style: { fillStyle?: string; strokeStyle?: string; lineWidth?: number } = {
    fillStyle: "orange",
  };

  constructor(scene?: Scene, config?: SquareConfig) {
    super(scene);
    this.vel = config?.vel || new Vector2D();
    this.size = config?.size || new Vector2D(10, 10);
    this.friction = config?.friction || 0.1;
    this.style = { ...this.style, ...config?.style };

    if (config?.startsWithBoundingBox) {
      this.boundingBox = new SquareBoundingBox(scene, this.size);
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
    const relativePos = new Vector2D(
      (this.pos.x - cameraPos.x) * cameraScale,
      (this.pos.y - cameraPos.y) * cameraScale
    );
    const scaledSize = new Vector2D(this.size.x * cameraScale, this.size.y * cameraScale);

    if (selected) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;
      ctx.strokeRect(
        relativePos.x - scaledSize.x / 2 - 5,
        relativePos.y - scaledSize.y / 2 - 5,
        scaledSize.x + 10,
        scaledSize.y + 10
      );
    }

    ctx.fillStyle = this.style.fillStyle || "orange";
    ctx.fillRect(
      relativePos.x - scaledSize.x / 2,
      relativePos.y - scaledSize.y / 2,
      scaledSize.x,
      scaledSize.y
    );

    if (this.style.strokeStyle) {
      ctx.strokeStyle = this.style.strokeStyle;
      ctx.lineWidth = this.style.lineWidth || 1;
      ctx.strokeRect(
        relativePos.x - scaledSize.x / 2,
        relativePos.y - scaledSize.y / 2,
        scaledSize.x,
        scaledSize.y
      );
    }
  }
}
