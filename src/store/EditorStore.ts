import { makeAutoObservable } from "mobx";
import type { Layer } from "../types/Layer";
import { LayerType, ShapeType, ToolType } from "../enums/CommonType";
import {
  DEFAULT_FILL_COLOR,
  DEFAULT_BRUSH_COLOR,
  DEFAULT_BRUSH_SIZE,
  DEFAULT_SHAPE_COLOR,
} from "../constants/ui";
import { v4 as uuid } from "uuid";
class EditorStore {
  brushColor: string = DEFAULT_BRUSH_COLOR;
  brushSize: number = DEFAULT_BRUSH_SIZE;
  currentTool: ToolType = ToolType.None;

  isDrawing = false;

  // Shape tool options
  shapeType: ShapeType = ShapeType.Rect;
  shapeColor: string = DEFAULT_SHAPE_COLOR;

  // Fill tool option
  fillColor: string = DEFAULT_FILL_COLOR;

  layers: Layer[] = [];
  history: Layer[] = [];
  redoStack: Layer[] = [];
  currentPath: { x: number; y: number }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setShapeColor(color: string) {
    this.shapeColor = color;
  }

  setFillColor(color: string) {
    this.fillColor = color;
  }

  setBrushColor(color: string) {
    this.brushColor = color;
  }

  setTool(tool: ToolType) {
    this.currentTool = tool;
  }

  addLayer(layer: Layer) {
    this.layers.push(layer);
    this.saveHistory();
  }

  removeLayer(id: string) {
    this.layers = this.layers.filter((layer) => layer.id !== id);
  }

  saveHistory() {
    this.history.push(JSON.parse(JSON.stringify(this.layers)));
    this.redoStack = [];
  }

  undo() {
    if (this.history.length > 1) {
      this.redoStack.push(this.history.pop() as Layer);
      this.layers = JSON.parse(
        JSON.stringify(this.history[this.history.length - 1]),
      );
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      const layerItem = this.redoStack.pop();
      this.history.push(JSON.parse(JSON.stringify(layerItem)));
      this.layers = JSON.parse(JSON.stringify(layerItem));
    }
  }

  startPath(point: { x: number; y: number }) {
    this.isDrawing = true;
    this.currentPath = [point];
  }

  addPoint(point: { x: number; y: number }) {
    if (!this.isDrawing) return;
    this.currentPath.push(point);
  }

  endPath() {
    if (!this.isDrawing || this.currentPath.length < 2) return;

    this.addLayer({
      id: uuid(),
      type: LayerType.Brush,
      data: {
        points: this.currentPath,
        color: this.brushColor,
        size: this.brushSize,
      },
    });

    this.isDrawing = false;
    this.currentPath = [];
  }
}

export const editorStore = new EditorStore();
