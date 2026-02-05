export * from "./classes/Vector2D";
export * from "./constants";
export * from "./nodes/boundingBox/BoundingBox";
export * from "./nodes/boundingBox/CircleBoundingBox";
export * from "./nodes/boundingBox/SquareBoundingBox";
export * from "./nodes/Camera";
export * from "./nodes/physics/KinematicBody";
export * from "./nodes/physics/StaticBody";
export * from "./nodes/Scene";
export * from "./nodes/shapes/Circle";
export * from "./nodes/shapes/Node";
export * from "./nodes/shapes/Square";

export function getCanvas(id: string): HTMLCanvasElement {
  const canvas = document.getElementById(id) as HTMLCanvasElement;
  if (!canvas) {
    throw new Error(`Canvas with id "${id}" not found`);
  }
  return canvas;
}
