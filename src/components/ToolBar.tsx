import { editorStore } from "../store/EditorStore";

export const ToolBar = () => (
  <div className="toolbar">
    <button onClick={() => editorStore.setTool("shape")}>Shape</button>
    <button onClick={() => editorStore.setTool("fill")}>Fill</button>
    <button onClick={() => editorStore.setTool("none")}>Clear Selection</button>
    <span className="paint-lite-header">PAINT LITE</span>
  </div>
);
