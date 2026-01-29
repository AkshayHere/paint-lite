import { ShapeType } from "../enums/CommonType";

export const SHAPE_SIZES = {
  [ShapeType.Rect]: 60,
  [ShapeType.Circle]: 50
} as const;

export const DEFAULT_SHAPE_COLOR = "#3498db";
