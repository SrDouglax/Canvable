import { Camera } from "./Camera";
import { InputManager } from "./InputManager";
import { Node } from "./Node";

export interface SceneOptions {
  camera?: Camera;
  inputManager?: InputManager;
}

export interface Updatable {
  update(deltaTime: number): void;
}

export interface Drawable {
  draw(ctx: CanvasRenderingContext2D): void;
}

export class Scene extends Node {
  camera: Camera;
  inputManager: InputManager;
  ctx: CanvasRenderingContext2D;
  private lastTime: number = 0;
  private totalTime: number = 0;

  constructor(ctx: CanvasRenderingContext2D, opts?: SceneOptions) {
    super();
    this.ctx = ctx;
    this.camera = opts?.camera || new Camera();
    this.inputManager = opts?.inputManager || new InputManager();

    this.setup();
  }

  addObject(object: Node): void {
    object.scene = this;
    super.addObject(object);
  }

  setup() {
    this.resizeCanvas();
  }

  resizeCanvas() {
    const canvas = this.ctx.canvas;
    const style = getComputedStyle(canvas);
    const width = parseInt(style.width);
    const height = parseInt(style.height);
    canvas.width = width;
    canvas.height = height;
  }

  update(deltaTime: number): void {
    // Update camera and objects if needed
    this.camera.update(deltaTime);
    this.children.forEach((child) => {
      if (isUpdatable(child)) {
        child.update(deltaTime);
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = ctx.canvas.style.backgroundColor || "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.children.forEach((child) => {
      if (isDrawable(child)) {
        child.draw(ctx);
      }
    });
  }

  gameLoop(callback?: (deltaTime: number, totalTime: number) => void, targetFPS: number = 60) {
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    const loop = (currentTime: number) => {
      try {
        const elapsed = currentTime - lastFrameTime;

        if (elapsed > frameInterval) {
          const deltaTime = (currentTime - this.lastTime) / 1000;
          this.lastTime = currentTime;
          this.totalTime += deltaTime;
          lastFrameTime = currentTime - (elapsed % frameInterval);

          this.update(deltaTime);
          this.draw(this.ctx);

          if (callback) {
            callback(deltaTime, this.totalTime);
          }

          this.inputManager.postUpdate();
        }
      } catch (error) {
        console.error("Error in game loop:", error);
      }
      requestAnimationFrame(loop);
    };

    this.lastTime = performance.now();
    requestAnimationFrame(loop);
  }
}

function isUpdatable(obj: any): obj is Updatable {
  return "update" in obj;
}

function isDrawable(obj: any): obj is Drawable {
  return "draw" in obj;
}
