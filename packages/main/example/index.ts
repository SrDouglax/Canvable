import "./style.css";

import { getCanvas } from "../src/main";
import { Circle } from "../src/nodes/Circle";
import { Scene } from "../src/nodes/Scene";

const canvas = getCanvas("app");
const ctx = canvas.getContext("2d")!;

const scene = new Scene(ctx);
scene.addObject(new Circle());

scene.gameLoop();

