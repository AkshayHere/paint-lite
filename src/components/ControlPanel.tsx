import { observer } from "mobx-react-lite";
import { editorStore } from "../store/EditorStore";
import { applyFill } from "../tools/FillTool";
import { LayerType, ShapeType } from "../enums/CommonType";

export const ControlPanel = observer(() => {
    switch (editorStore.currentTool) {
        case LayerType.Shape:
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
                    <br/>
                    <input
                      type="color"
                      className="color-input"
                      value={editorStore.shapeColor}
                      onChange={e => (editorStore.shapeColor = e.target.value)}
                    />
                </div>
            );
        case LayerType.Fill:
            return (
                <div className="panel">
                    <h3>Fill Tool</h3>
                    <input
                      type="color"
                      className="color-input"
                      value={editorStore.fillColor}
                      onChange={e => (editorStore.fillColor = e.target.value)}
                    />
                    <br/>
                    <button onClick={applyFill}>Apply</button>
                </div>
            );
        default:
            break;
    }
});
