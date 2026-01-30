import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { ToolBar } from "@/components/ToolBar";
import { editorStore } from "@/store/EditorStore";
import { ToolType } from "@/enums/CommonType";

describe("ToolBar", () => {
  beforeEach(() => {
    editorStore.currentTool = ToolType.None;
  });

  it("renders all toolbar buttons", () => {
    render(<ToolBar />);

    expect(screen.getByText("Shape")).toBeInTheDocument();
    expect(screen.getByText("Fill")).toBeInTheDocument();
    expect(screen.getByText("Brush")).toBeInTheDocument();
    expect(screen.getByText("Close Tools")).toBeInTheDocument();
  });

  it("sets Shape tool when Shape button is clicked", () => {
    render(<ToolBar />);
    fireEvent.click(screen.getByText("Shape"));
    expect(editorStore.currentTool).toBe(ToolType.Shape);
  });

  it("sets Fill tool when Fill button is clicked", () => {
    render(<ToolBar />);
    fireEvent.click(screen.getByText("Fill"));
    expect(editorStore.currentTool).toBe(ToolType.Fill);
  });

  it("sets Brush tool when Brush button is clicked", () => {
    render(<ToolBar />);
    fireEvent.click(screen.getByText("Brush"));
    expect(editorStore.currentTool).toBe(ToolType.Brush);
  });

  it("sets tool to None when Close Tools is clicked", () => {
    render(<ToolBar />);
    fireEvent.click(screen.getByText("Close Tools"));
    expect(editorStore.currentTool).toBe(ToolType.None);
  });

  it("renders the app title", () => {
    render(<ToolBar />);
    expect(screen.getByText("PAINT LITE")).toBeInTheDocument();
  });
});
