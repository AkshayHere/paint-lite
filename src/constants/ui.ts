import { ShapeType } from "../enums/CommonType";

// Canvas Colors
export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 400;
export const DEFAULT_BG_COLOR = "#ff0000";

// Brush
export const DEFAULT_BRUSH_COLOR = "#ff0000";
export const DEFAULT_BRUSH_SIZE = 4;

export const SHAPE_SIZES = {
  [ShapeType.Rect]: 60,
  [ShapeType.Circle]: 50
} as const;

export const DEFAULT_SHAPE_COLOR = "#3498db";

