import { observer } from "mobx-react-lite";
import { editorStore } from "../store/EditorStore";
import { applyFill } from "../tools/FillTool";
import { ShapeType, ToolType } from "../enums/CommonType";

export const ControlPanel = observer(() => {
    switch (editorStore.currentTool) {
        case ToolType.Shape:
            return (
                <div className="panel">
                    <h3>Shape Tool</h3>
                    <select
                        value={editorStore.shapeType}
                        onChange={e => (editorStore.shapeType = e.target.value as ShapeType)}
                    >
                        <option value={ShapeType.Rect}>Rectangle</option>
                        <option value={ShapeType.Circle}>Circle</option>
                    </select>
                    <br />
                    <input
                        id="shapeColor"
                        type="color"
                        className="color-input"
                        value={editorStore.shapeColor}
                        onChange={e => editorStore.setShapeColor(e.target.value)}
                    />
                </div>
            );
        case ToolType.Fill:
            return (
                <div className="panel">
                    <h3>Fill Tool</h3>
                    <input
                        id="fillColor"
                        type="color"
                        className="color-input"
                        value={editorStore.fillColor}
                        onChange={e => (editorStore.setFillColor(e.target.value))}
                    />
                    <br />
                    <button onClick={applyFill}>Apply</button>
                </div>
            );
        case ToolType.Brush:
            return (
                <div className="panel">
                    <h3>Brush</h3>
                    <label>
                        Color
                        <input
                            id="brushColor"
                            type="color"
                            value={editorStore.brushColor}
                            onChange={e => editorStore.setBrushColor(e.target.value)}
                        />
                    </label>

                    <label>
                        Size
                        <input
                            type="range"
                            min={1}
                            max={20}
                            value={editorStore.brushSize}
                            onChange={e => (editorStore.brushSize = +e.target.value)}
                        />
                    </label>
                </div>
            );
        default:
            return null;
    }
});
