import type { LayerType, ShapeType } from "../enums/CommonType";

export interface ShapeLayerData {
  x: number;
  y: number;
  shape: ShapeType.Rect | ShapeType.Circle;
  color: string;
  size: number;
}

export interface FillLayerData {
  color: string;
}

export type Layer =
  | {
      id: string;
      type: LayerType.Shape;
      data: ShapeLayerData;
    }
  | {
      id: string;
      type: LayerType.Fill;
      data: FillLayerData;
    }
  | {
      id: string;
      type: LayerType.Brush;
      data: BrushLayerData;
    };

export interface Point {
  x: number;
  y: number;
}

export interface BrushLayerData {
  points: Point[];
  color: string;
  size: number;
}
