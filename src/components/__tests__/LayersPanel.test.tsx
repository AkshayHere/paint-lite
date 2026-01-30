import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { LayersPanel } from "@/components/LayersPanel";
import { editorStore } from "@/store/EditorStore";
import { LayerType, ShapeType } from "@/enums/CommonType";
import { TEST_FILL_COLOR, TEST_SHAPE_COLOR } from "@/constants/ui";

describe("LayersPanel", () => {
  beforeEach(() => {
    editorStore.layers = [
      {
        id: "1",
        type: LayerType.Fill,
        data: { color: TEST_FILL_COLOR }
      },
      {
        id: "2",
        type: LayerType.Shape,
        data: {
          x: 10,
          y: 20,
          shape: ShapeType.Circle,
          color: TEST_SHAPE_COLOR,
          size: 20
        }
      }
    ];
  });

  it("renders the Layers title", () => {
    render(<LayersPanel />);
    expect(screen.getByText("Layers")).toBeInTheDocument();
  });

  it("renders one list item per layer", () => {
    render(<LayersPanel />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
  });

  it("shows layer types", () => {
    render(<LayersPanel />);
    expect(screen.getByText(/fill/i)).toBeInTheDocument();
    expect(screen.getByText(/shape/i)).toBeInTheDocument();
  });

  it("removes the correct layer when delete is clicked", () => {
    render(<LayersPanel />);

    const deleteButtons = screen.getAllByRole("button");
    fireEvent.click(deleteButtons[0]);

    expect(editorStore.layers).toHaveLength(1);
    expect(editorStore.layers[0].id).toBe("2");
  });
});
