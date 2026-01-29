import { makeAutoObservable } from "mobx";
import type { Layer } from "../types/Layer";
import { DEFAULT_SHAPE_COLOR } from "../constants/tools";
import { ShapeType } from "../enums/CommonType";

export type ToolType = "none" | "shape" | "fill";
// export type ShapeType = "rect" | "circle";

class EditorStore {
  currentTool: ToolType = "none";

  // Shape tool options
  shapeType: ShapeType = ShapeType.Rect;
  shapeColor: string = DEFAULT_SHAPE_COLOR;

  // Fill tool option
  fillColor: string = "#ffffff";

  layers: Layer[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: ToolType) {
    this.currentTool = tool;
  }

  addLayer(layer: Layer) {
    console.log("layer: ", layer);
    this.layers.push(layer);
  }

  removeLayer(id: string) {
    this.layers = this.layers.filter(layer => layer.id !== id);
  }
}

export const editorStore = new EditorStore();
