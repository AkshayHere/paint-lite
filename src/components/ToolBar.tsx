import { ToolType } from "../enums/CommonType";
import { editorStore } from "../store/EditorStore";

export const ToolBar = () => (
    <div className="toolbar">
        <button onClick={() => editorStore.setTool(ToolType.Shape)}>Shape</button>
        <button onClick={() => editorStore.setTool(ToolType.Fill)}>Fill</button>
        <button onClick={() => editorStore.setTool(ToolType.Brush)}>Brush</button>
        <button onClick={() => editorStore.setTool(ToolType.None)}>Close Tools</button>
        <span className="paint-lite-header">PAINT LITE</span>
    </div>
);
