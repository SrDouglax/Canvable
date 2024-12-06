import { v4 as uuidv4 } from "uuid";
import { Vector2D } from "../classes/Vector2D";
import { Scene } from "./Scene";

export interface NodeConfig {
  id?: string;
  pos?: Vector2D;
  scene?: Scene;
}

export class Node {
  public pos: Vector2D;

  public id: string;
  public children: Node[] = [];

  scene?: Scene;

  constructor(scene?: Scene, config?: NodeConfig) {
    this.scene = scene;

    const { id, pos } = config || {};
    this.id = id || this.generateID();
    this.pos = pos || new Vector2D();
    this.pos.onChange.push((delta) => {
      for (const child of this.children) {
        child.pos = child.pos.add(delta);
      }
    });
  }

  addObject(object: Node): void {
    this.children.push(object);
    if (!object.scene) object.scene = this.scene;
  }

  removeObject(object: Node): void {
    const index = this.children.indexOf(object);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  private generateID(): string {
    return uuidv4();
  }
}
