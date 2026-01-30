import { describe, it, expect, beforeEach, vi } from "vitest";
import { applyFill } from "@/tools/FillTool";
import { editorStore } from "@/store/EditorStore";
import { LayerType } from "@/enums/CommonType";
import { TEST_FILL_COLOR } from "@/constants/ui";

vi.mock("uuid", () => ({
  v4: () => "mock-id",
}));

describe("FillTool", () => {
  beforeEach(() => {
    editorStore.layers = [];
    editorStore.fillColor = TEST_FILL_COLOR;
  });

  it("check the fill layer default color", () => {
    expect(editorStore.layers).toHaveLength(0);
  });

  it("adds a fill layer with the selected color", () => {
    applyFill();
    expect(editorStore.layers).toHaveLength(1);
    const [layer] = editorStore.layers;
    expect(layer).toEqual({
      id: "mock-id",
      type: LayerType.Fill,
      data: {
        color: TEST_FILL_COLOR,
      },
    });
  });
});
