import { observer } from "mobx-react-lite";
import { editorStore } from "@/store/EditorStore";
import { applyFill } from "@/tools/FillTool";
import { ShapeType, ToolType } from "@/enums/CommonType";

export const ControlPanel = observer(() => {
    switch (editorStore.currentTool) {
        case ToolType.Shape:
            return (
                <div className="panel">
                    <h3>Shape Tool</h3>
                    <div className="panel-element">
                        <select
                            id="shapeType"
                            data-testid="shapeType"
                            className="panel-select"
                            value={editorStore.shapeType}
                            onChange={e => (editorStore.shapeType = e.target.value as ShapeType)}
                        >
                            <option value={ShapeType.Rect}>Rectangle</option>
                            <option value={ShapeType.Circle}>Circle</option>
                        </select>
                        &nbsp;&nbsp;
                        <input
                            id="shapeColor"
                            data-testid="shapeColor"
                            type="color"
                            className="panel-picker"
                            value={editorStore.shapeColor}
                            onChange={e => editorStore.setShapeColor(e.target.value)}
                        />
                    </div>
                </div>
            );
        case ToolType.Fill:
            return (
                <div className="panel">
                    <h3>Fill Tool</h3>
                    <div className="panel-element">
                        <input
                            id="fillColor"
                            data-testid="fillColor"
                            type="color"
                            className="panel-picker"
                            value={editorStore.fillColor}
                            onChange={e => (editorStore.setFillColor(e.target.value))}
                        />&nbsp;&nbsp;
                        <button className="panel-button" onClick={applyFill}>Apply</button>
                    </div>
                </div>
            );
        case ToolType.Brush:
            return (
                <div className="panel">
                    <h3>Brush</h3>
                    <label className="panel-element">
                        <span className="panel-text">Color</span>
                        <input
                            id="brushColor"
                            data-testid="brushColor"
                            type="color"
                            className="panel-picker"
                            value={editorStore.brushColor}
                            onChange={e => editorStore.setBrushColor(e.target.value)}
                        />
                    </label>
                    <label className="panel-element">
                        <span className="panel-text">Size</span>
                        <input
                            type="range"
                            className="panel-picker"
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
