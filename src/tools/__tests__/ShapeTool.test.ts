import { describe, it, expect, beforeEach, vi } from "vitest";
import { handleShapeClick } from "@/tools/ShapeTool";
import { editorStore } from "@/store/EditorStore";
import { LayerType, ShapeType } from "@/enums/CommonType";
import { SHAPE_SIZES, TEST_SHAPE_COLOR } from "@/constants/ui";

vi.mock("uuid", () => ({
  v4: () => "mock-shape-id"
}));

describe("ShapeTool", () => {
  beforeEach(() => {
    editorStore.layers = [];
    editorStore.shapeType = ShapeType.Circle;
    editorStore.shapeColor = TEST_SHAPE_COLOR;
  });

  it("adds a shape layer with correct data", () => {
    handleShapeClick(100, 200);

    expect(editorStore.layers).toHaveLength(1);

    const layer = editorStore.layers[0];

    expect(layer).toEqual({
      id: "mock-shape-id",
      type: LayerType.Shape,
      data: {
        x: 100,
        y: 200,
        shape: ShapeType.Circle,
        color: TEST_SHAPE_COLOR,
        size: SHAPE_SIZES[ShapeType.Circle]
      }
    });
  });
});
