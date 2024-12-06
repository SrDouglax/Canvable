import { Circle, getCanvas, Scene } from "@jiant/canvable";
import "./style.css";

const canvas = getCanvas("app")!;
const ctx = canvas.getContext("2d")!;
const scene = new Scene(ctx);
console.log(scene);

const c = new Circle(scene, { startsWithBoundingBox: true });

scene.addObject(c);

canvas.style.backgroundColor = "black";

scene.gameLoop((dt, total) => {
  if (scene.inputManager.justPressed("Enter")) {
    console.log(scene);
  }

  c.pos.x = Math.sin(total) * 100 + 200;

  // console.log(c.boundingBox.pos, scene.inputManager.mousePos);
  if (c.boundingBox.isPointInside(scene.inputManager.mousePos)) {
    c.size = 199;
  } else {
    c.size = 10;
  }
}, 39);
