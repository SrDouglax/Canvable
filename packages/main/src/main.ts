export * from "./classes/Vector2D";
export * from "./constants";
export * from "./nodes/BoundingBox";
export * from "./nodes/Camera";
export * from "./nodes/Circle";
export * from "./nodes/CircleBoundingBox";
export * from "./nodes/Node";
export * from "./nodes/Scene";

export function getCanvas(id: string): HTMLCanvasElement {
  const canvas = document.getElementById(id) as HTMLCanvasElement;
  if (!canvas) {
    throw new Error(`Canvas with id "${id}" not found`);
  }
  return canvas;
}
