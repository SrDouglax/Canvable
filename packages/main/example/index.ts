import {
  Circle,
  CircleBoundingBox,
  getCanvas,
  KinematicBody,
  Scene,
  Square,
  SquareBoundingBox,
  StaticBody,
  Vector2D
} from "../src/main";

// Initialize Canvas and Scene
const canvas = getCanvas("app");
const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Could not get 2D context");
}

const scene = new Scene(ctx);
scene.camera.pos = new Vector2D(0, 0);
scene.camera.zoom = 1;

// --- Player Setup ---
const playerSize = 50;
const playerShape = new Square(scene, {
  size: new Vector2D(playerSize, playerSize),
});
playerShape.pos = new Vector2D(0, 0); // Start at center
playerShape.style.fillStyle = "#00FF00"; // Green Player

// Add Bounding Box
playerShape.boundingBox = new SquareBoundingBox(scene, new Vector2D(playerSize, playerSize));
playerShape.addObject(playerShape.boundingBox);

// Add Physics Body
const playerBody = new KinematicBody(scene, playerShape, {
  speed: 2000,
  friction: 0.85,
  maxSpeed: 600,
});
scene.addObject(playerBody);


// --- Level Setup ---
const wallThickness = 50;
const arenaSize = 1000;

function createWall(x: number, y: number, w: number, h: number) {
  const wallShape = new Square(scene, { size: new Vector2D(w, h) });
  wallShape.pos = new Vector2D(x, y);
  wallShape.style.fillStyle = "#555";
  wallShape.boundingBox = new SquareBoundingBox(scene, new Vector2D(w, h));
  wallShape.addObject(wallShape.boundingBox);
  const wallBody = new StaticBody(scene, wallShape);
  scene.addObject(wallBody);
}

// Walls
createWall(0, -arenaSize / 2 - wallThickness / 2, arenaSize + wallThickness * 2, wallThickness); // Top
createWall(0, arenaSize / 2 + wallThickness / 2, arenaSize + wallThickness * 2, wallThickness); // Bottom
createWall(-arenaSize / 2 - wallThickness / 2, 0, wallThickness, arenaSize); // Left
createWall(arenaSize / 2 + wallThickness / 2, 0, wallThickness, arenaSize); // Right

// Random Obstacles
for (let i = 0; i < 15; i++) {
  const isCircle = Math.random() > 0.5;
  const x = (Math.random() - 0.5) * (arenaSize - 200);
  const y = (Math.random() - 0.5) * (arenaSize - 200);

  if (isCircle) {
    const size = 30 + Math.random() * 30;
    const circle = new Circle(scene, { size: size });
    circle.pos = new Vector2D(x, y);
    circle.style.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
    circle.boundingBox = new CircleBoundingBox(scene, size);
    circle.addObject(circle.boundingBox);

    const body = new KinematicBody(scene, circle, {
      speed: 1000,
      friction: 0.95,
      maxSpeed: 500
    });
    scene.addObject(body);
  } else {
    const w = 40 + Math.random() * 40;
    const h = 40 + Math.random() * 40;
    const square = new Square(scene, { size: new Vector2D(w, h) });
    square.pos = new Vector2D(x, y);
    square.style.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
    square.boundingBox = new SquareBoundingBox(scene, new Vector2D(w, h));
    square.addObject(square.boundingBox);

    const body = new KinematicBody(scene, square, {
      speed: 1000,
      friction: 0.95,
      maxSpeed: 500
    });
    scene.addObject(body);
  }
}

// --- Game Loop ---
scene.run((deltaTime, totalTime) => {
  // Player Control
  const input = scene.inputManager;
  let moveX = 0;
  let moveY = 0;

  if (input.isPressed("ArrowUp") || input.isPressed("KeyW")) moveY -= 1;
  if (input.isPressed("ArrowDown") || input.isPressed("KeyS")) moveY += 1;
  if (input.isPressed("ArrowLeft") || input.isPressed("KeyA")) moveX -= 1;
  if (input.isPressed("ArrowRight") || input.isPressed("KeyD")) moveX += 1;

  // Check if sprinting
  const isSprinting = input.isPressed("ShiftLeft") || input.isPressed("ShiftRight");

  // Update maxSpeed AND friction dynamically based on sprint state
  playerBody.maxSpeed = isSprinting ? 1200 : 600;
  playerBody.friction = isSprinting ? 0.92 : 0.85; // Less friction when sprinting = faster acceleration

  // Normalize input vector
  if (moveX !== 0 || moveY !== 0) {
    const length = Math.sqrt(moveX * moveX + moveY * moveY);
    moveX /= length;
    moveY /= length;

    // Apply force
    const baseForce = 5000;
    const sprintMultiplier = 2.5;
    const force = isSprinting ? baseForce * sprintMultiplier : baseForce;

    playerBody.applyForce(moveX * force * deltaTime, moveY * force * deltaTime, deltaTime);
  }

  // Camera Follow
  const targetPos = playerBody.pos;
  const lerpFactor = 5 * deltaTime;
  scene.camera.pos.x += (targetPos.x - scene.camera.pos.x) * lerpFactor;
  scene.camera.pos.y += (targetPos.y - scene.camera.pos.y) * lerpFactor;

  // Debug Info
  // console.log(`Player Pos: ${targetPos.x.toFixed(2)}, ${targetPos.y.toFixed(2)}`);
});
