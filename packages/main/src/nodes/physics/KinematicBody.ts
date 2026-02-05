import { Vector2D } from "../../classes/Vector2D";
import { Scene } from "../Scene";
import { Node } from "../shapes/Node";
import { StaticBody } from "./StaticBody";

export interface KinematicBodyConfig {
  speed?: number;
  friction?: number;
  maxSpeed?: number;
}

export class KinematicBody extends Node {
  shape: Node;


  velocity: Vector2D = new Vector2D();
  speed: number = 1500;
  friction: number = 0.92;
  maxSpeed: number = 800;

  isColliding: boolean = false;

  constructor(scene: Scene, shape: Node, config?: KinematicBodyConfig) {
    super(scene, { pos: shape.pos });
    this.shape = shape;

    if (config?.speed) this.speed = config.speed;
    if (config?.friction) this.friction = config.friction;
    if (config?.maxSpeed) this.maxSpeed = config.maxSpeed;
  }

  applyForce(x: number, y: number, dt: number) {

    const len = Math.sqrt(x * x + y * y);
    if (len > 0) {
      const scale = (this.speed * dt) / len;
      this.velocity.x += x * scale;
      this.velocity.y += y * scale;
    }
  }

  update(dt: number): void {

    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;


    const currentSpeed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    if (currentSpeed > this.maxSpeed) {
      const scale = this.maxSpeed / currentSpeed;
      this.velocity.x *= scale;
      this.velocity.y *= scale;
    }


    if (Math.abs(this.velocity.x) < 0.1) this.velocity.x = 0;
    if (Math.abs(this.velocity.y) < 0.1) this.velocity.y = 0;


    this.pos.x += this.velocity.x * dt;
    this.pos.y += this.velocity.y * dt;


    this.shape.pos = this.pos;


    if (this.shape.update) this.shape.update(dt);


    this.resolveCollisions();
  }

  private resolveCollisions() {
    this.isColliding = false;
    if (!this.shape.boundingBox) return;



    if (!this.scene) return;

    for (const obj of this.scene.children) {
      if (obj === this) continue;

      let otherBBox = null;


      if (obj instanceof StaticBody || obj instanceof KinematicBody) {
        if (obj.shape.boundingBox) otherBBox = obj.shape.boundingBox;
      } else {
        if (obj.boundingBox) otherBBox = obj.boundingBox;
      }

      if (otherBBox) {

        const result = this.shape.boundingBox.checkCollision(otherBBox);
        if (result.isColliding && result.mtv) {
          this.isColliding = true;


          this.pos.x += result.mtv.x;
          this.pos.y += result.mtv.y;


          this.shape.pos = this.pos;

          if (this.shape.boundingBox) this.shape.boundingBox.pos = this.pos;
        }
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, selected?: boolean) {


    if (this.shape.draw) this.shape.draw(ctx, selected);
  }
}
