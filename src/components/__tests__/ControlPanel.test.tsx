import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { ControlPanel } from "@/components/ControlPanel";
import { editorStore } from "@/store/EditorStore";
import { ToolType, ShapeType } from "@/enums/CommonType";
import { applyFill } from "@/tools/FillTool";
import { DEFAULT_BRUSH_COLOR, DEFAULT_BRUSH_SIZE, DEFAULT_FILL_COLOR, DEFAULT_SHAPE_COLOR, TEST_BRUSH_COLOR } from "@/constants/ui";

vi.mock("@/tools/FillTool", () => ({
  applyFill: vi.fn()
}));

describe("ControlPanel", () => {
  beforeEach(() => {
    editorStore.currentTool = ToolType.None;
    editorStore.shapeType = ShapeType.Rect;
    editorStore.shapeColor = DEFAULT_SHAPE_COLOR;
    editorStore.fillColor = DEFAULT_FILL_COLOR;
    editorStore.brushColor = DEFAULT_BRUSH_COLOR;
    editorStore.brushSize = DEFAULT_BRUSH_SIZE;
  });

  it("renders nothing when no tool is selected", () => {
    render(<ControlPanel />);
    expect(screen.queryByText(/tool/i)).toBeNull();
  });

  it("renders Shape tool controls and updates store", () => {
    editorStore.currentTool = ToolType.Shape;
    render(<ControlPanel />);
    // shape selector
    const select = screen.getByTestId("shapeType");
    fireEvent.change(select, {
      target: { value: ShapeType.Circle }
    });

    expect(editorStore.shapeType).toBe(ShapeType.Circle);
    const colorInput = screen.getByTestId("shapeColor") as HTMLInputElement;

    fireEvent.change(colorInput, {
      target: { value: "#00ff00" }
    });

    expect(editorStore.shapeColor).toBe("#00ff00");
  });

  it("renders Fill tool and calls applyFill", () => {
    editorStore.currentTool = ToolType.Fill;
    render(<ControlPanel />);

    const button = screen.getByRole("button", { name: /apply/i });
    fireEvent.click(button);

    expect(applyFill).toHaveBeenCalledTimes(1);
  });

  it("renders Brush tool and updates color and size", () => {
    editorStore.currentTool = ToolType.Brush;
    render(<ControlPanel />);

    const colorInput = screen.getByLabelText(/color/i) as HTMLInputElement;
    fireEvent.change(colorInput, {
      target: { value: TEST_BRUSH_COLOR }
    });

    expect(editorStore.brushColor).toBe(TEST_BRUSH_COLOR);

    const sizeSlider = screen.getByRole("slider") as HTMLInputElement;
    fireEvent.change(sizeSlider, {
      target: { value: "12" }
    });

    expect(editorStore.brushSize).toBe(12);
  });
});
