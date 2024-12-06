import { TWO_PI } from "../constants";

/**
 * A 2D vector class for mathematical operations and physics calculations
 */
export class Vector2D {
  private _x: number = 0;
  private _y: number = 0;
  constructor(x: number = 0, y: number = 0) {
    this._x = x;
    this._y = y;
  }

  onChange: ((delta: Vector2D) => void)[] = [];

  /**
   * Sets the x component of the vector and notifies any registered callbacks.
   * @param x - The new x value for the vector.
   */
  set x(x: number) {
    const d = new Vector2D(x - this._x, this.y - this._y)
    for (const callback of this.onChange) {
      callback(d);
    }
    this._x = x;
  }
  /**
   * Sets the y component of the vector and notifies any registered callbacks.
   * @param y - The new y value for the vector.
   */
  set y(y: number) {
    for (const callback of this.onChange) {
      callback(new Vector2D(this.x - this._x, y - this._y));
    }
    this._y = y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  /**
   * Adds another vector to this vector
   * @param vector - The vector to add
   * @param self - If true, modifies the current vector in place, otherwise returns a new vector
   * @returns A new Vector2D representing the sum
   */
  add(vector: Vector2D, self: boolean = false): Vector2D {
    if (self) {
      this.x += vector.x;
      this.y += vector.y;
      return this;
    } else {
      return new Vector2D(this.x + vector.x, this.y + vector.y);
    }
  }

  /**
   * Subtracts another vector from this vector
   * @param vector - The vector to subtract
   * @param self - If true, modifies the current vector in place, otherwise returns a new vector
   * @returns A new Vector2D representing the difference
   */
  subtract(vector: Vector2D, self: boolean = false): Vector2D {
    if (self) {
      this.x -= vector.x;
      this.y -= vector.y;
      return this;
    } else {
      return new Vector2D(this.x - vector.x, this.y - vector.y);
    }
  }

  /**
   * Multiplies this vector by a scalar value
   * @param scalar - The scalar value to multiply by
   * @returns A new Vector2D scaled by the input value
   */
  multiply(scalar: number): Vector2D {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  /**
   * Divides this vector by a scalar value
   * @param scalar - The scalar value to divide by
   * @throws {Error} If scalar is zero
   * @returns A new Vector2D divided by the scalar value
   */
  divide(scalar: number): Vector2D {
    if (scalar === 0) throw new Error("Cannot divide by zero");
    return new Vector2D(this.x / scalar, this.y / scalar);
  }

  /**
   * Calculates the magnitude (length) of this vector
   * @returns The magnitude of the vector
   */
  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Creates a normalized (unit) vector pointing in the same direction
   * @returns A new Vector2D with magnitude 1 (or 0 if this vector is 0)
   */
  normalize(): Vector2D {
    const mag = this.magnitude();
    if (mag === 0) return new Vector2D(0, 0);
    return this.divide(mag);
  }

  /**
   * Calculates the dot product with another vector
   * @param vector - The vector to calculate the dot product with
   * @returns The dot product of the two vectors
   */
  dot(vector: Vector2D): number {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
   * Calculates the 2D cross product with another vector
   * @param vector - The vector to calculate the cross product with
   * @returns The magnitude of the cross product
   */
  cross(vector: Vector2D): number {
    return this.x * vector.y - this.y * vector.x;
  }

  /**
   * Calculates the angle between this vector and another vector
   * @param vector - The vector to calculate the angle with
   * @returns The angle in radians between the two vectors
   */
  angle(vector: Vector2D): number {
    const dot = this.dot(vector);
    const mags = this.magnitude() * vector.magnitude();
    return Math.acos(dot / mags);
  }

  /**
   * Rotates the vector by a given angle
   * @param angle - The angle to rotate by (in radians)
   * @returns A new Vector2D rotated by the specified angle
   */
  rotate(angle: number): Vector2D {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Vector2D(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
  }

  /**
   * Calculates the distance to another vector
   * @param vector - The vector to calculate the distance to
   * @returns The distance between the two vectors
   */
  distance(vector: Vector2D): number {
    return this.subtract(vector).magnitude();
  }

  /**
   * Projects this vector onto another vector
   * @param vector - The vector to project onto
   * @returns A new Vector2D representing the projection
   */
  project(vector: Vector2D): Vector2D {
    const normalized = vector.normalize();
    const scalar = this.dot(normalized);
    return normalized.multiply(scalar);
  }

  /**
   * Reflects this vector across a normal
   * @param normal - The normal vector to reflect across
   * @returns A new Vector2D representing the reflection
   */
  reflect(normal: Vector2D): Vector2D {
    const normalized = normal.normalize();
    return this.subtract(normalized.multiply(2 * this.dot(normalized)));
  }

  /**
   * Linearly interpolates between this vector and another vector
   * @param vector - The vector to interpolate towards
   * @param t - The interpolation parameter (0-1)
   * @returns A new Vector2D representing the interpolated vector
   */
  lerp(vector: Vector2D, t: number): Vector2D {
    return new Vector2D(this.x + (vector.x - this.x) * t, this.y + (vector.y - this.y) * t);
  }

  /**
   * Limits the magnitude of this vector to a maximum value
   * @param max - The maximum magnitude
   * @returns A new Vector2D with limited magnitude
   */
  limit(max: number): Vector2D {
    const mag = this.magnitude();
    if (mag > max) {
      return this.normalize().multiply(max);
    }
    return new Vector2D(this.x, this.y);
  }

  /**
   * Checks if this vector is equal to another vector within a tolerance
   * @param vector - The vector to compare with
   * @param tolerance - The maximum difference allowed (default: 0.000001)
   * @returns True if the vectors are equal within the tolerance
   */
  equals(vector: Vector2D, tolerance: number = 0.000001): boolean {
    return Math.abs(this.x - vector.x) < tolerance && Math.abs(this.y - vector.y) < tolerance;
  }

  /**
   * Creates a copy of this vector
   * @returns A new Vector2D with the same components
   */
  clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  /**
   * Converts the vector to a string representation
   * @returns A string representation of the vector
   */
  toString(): string {
    return `Vector2D(${this.x}, ${this.y})`;
  }

  /**
   * Creates a vector pointing in a specific direction
   * @param angle - The angle in radians
   * @param magnitude - The length of the vector (default: 1)
   * @returns A new Vector2D with the specified angle and magnitude
   */
  static fromAngle(angle: number, magnitude: number = 1): Vector2D {
    return new Vector2D(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
  }

  /**
   * Creates a random vector with the specified magnitude
   * @param magnitude - The length of the vector (default: 1)
   * @returns A new Vector2D with random direction and specified magnitude
   */
  static random(magnitude: number = 1): Vector2D {
    const angle = Math.random() * TWO_PI;
    return Vector2D.fromAngle(angle, magnitude);
  }

  /**
   * Adds two vectors together
   * @param v1 - The first vector
   * @param v2 - The second vector
   * @returns A new Vector2D representing the sum
   */
  static add(v1: Vector2D, v2: Vector2D): Vector2D {
    return v1.add(v2);
  }

  /**
   * Subtracts one vector from another
   * @param v1 - The vector to subtract from
   * @param v2 - The vector to subtract
   * @returns A new Vector2D representing the difference
   */
  static subtract(v1: Vector2D, v2: Vector2D): Vector2D {
    return v1.subtract(v2);
  }

  /**
   * Calculates the distance between two vectors
   * @param v1 - The first vector
   * @param v2 - The second vector
   * @returns The distance between the vectors
   */
  static distance(v1: Vector2D, v2: Vector2D): number {
    return v1.distance(v2);
  }
}
