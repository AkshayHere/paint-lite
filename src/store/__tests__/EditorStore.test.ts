// import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach } from "vitest";
import { editorStore } from "@/store/EditorStore";
import { LayerType } from "@/enums/CommonType";
import { resetStore } from "@/store/resetStore";
import { TEST_BRUSH_COLOR, TEST_SHAPE_COLOR } from "@/constants/ui";
import type { BrushLayerData } from "@/types/Layer";

describe("EditorStore", () => {
  beforeEach(resetStore);

  it("Add a layer", () => {
    editorStore.addLayer({
      id: "1",
      type: LayerType.Fill,
      data: { color: "#fff" },
    });

    expect(editorStore.layers).toHaveLength(1);
  });

  it("removes a layer", () => {
    editorStore.addLayer({
      id: "1",
      type: LayerType.Fill,
      data: { color: "#ffffff" },
    });

    editorStore.removeLayer("1");
    expect(editorStore.layers).toHaveLength(0);
  });

  it("Set shape color for layer", () => {
    editorStore.setShapeColor(TEST_SHAPE_COLOR);
    expect(editorStore.shapeColor).toBe(TEST_SHAPE_COLOR);
  });

  it("Set brush color for layer", () => {
    editorStore.setBrushColor(TEST_BRUSH_COLOR);
    expect(editorStore.brushColor).toBe(TEST_BRUSH_COLOR);
  });

  it("Test brush path", () => {
    expect(editorStore.isDrawing).toBe(false);
    // Start a new path
    editorStore.startPath({ x: 10, y: 20 });
    expect(editorStore.isDrawing).toBe(true);
    expect(editorStore.currentPath).toStrictEqual([
      {
        x: 10,
        y: 20,
      },
    ]);
    // Add a point to the path
    editorStore.addPoint({ x: 20, y: 30 });
    expect(editorStore.currentPath).toStrictEqual([
      {
        x: 10,
        y: 20,
      },
      {
        x: 20,
        y: 30,
      },
    ]);
    // end path
    editorStore.endPath();
    expect(editorStore.isDrawing).toBe(false);
    expect(editorStore.layers).toHaveLength(1);
    const [brushLayer] = editorStore.layers;
    expect(brushLayer.type).toBe(LayerType.Brush);
    const brushLayerData = brushLayer.data as BrushLayerData;
    expect(brushLayerData.points).toHaveLength(2);
  });
});
