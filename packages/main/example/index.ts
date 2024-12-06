import "./style.css";

import { Vector2D } from "../src/classes/Vector2D";
import { Circle } from "../src/nodes/Circle";
import { getCanvas } from "../src/main";

getCanvas("app");

const objects: any[] = [];

objects.push(new Circle());

