import { Scene } from "../Scene";
import { Node } from "../shapes/Node";

export class StaticBody extends Node {
  shape: Node;

  constructor(scene: Scene, shape: Node) {
    super(scene, { pos: shape.pos });
    this.shape = shape;
    this.pos = shape.pos;
  }

  update(_dt: number) {
    if (this.shape.update && typeof this.shape.update === 'function') {
      this.shape.update(_dt);
    }
  }

  draw(ctx: CanvasRenderingContext2D, selected?: boolean) {
    if (this.shape.draw) this.shape.draw(ctx, selected);
  }
}