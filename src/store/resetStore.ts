import type { ToolType } from "@/enums/CommonType";
import { editorStore } from "@/store/EditorStore";

export function resetStore() {
  editorStore.layers = [];
  editorStore.currentTool = "none" as ToolType;
  editorStore.isDrawing = false;
  editorStore.currentPath = [];
}
