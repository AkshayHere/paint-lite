import { observer } from "mobx-react-lite";
import { editorStore } from "../store/EditorStore";

export const LayersPanel = observer(() => (
    <>
        <div className="layer-panel">
            <h3>Layers</h3>
            <div className="layers">
                <ol className="layer-list">
                    {editorStore.layers.map((layer) => (
                        <li key={layer.id} className="layer">
                            <span className="layer-text">{layer.type}&nbsp;<button className="layer-btn" onClick={() => editorStore.removeLayer(layer.id)}>✕</button></span>
                        </li>
                    ))}
                </ol>
                {/* {editorStore.layers.map((layer, i) => (
                    <div key={layer.id} className="layer">
                        {i + 1}. {layer.type}&nbsp;
                        <button onClick={() => editorStore.removeLayer(layer.id)}>✕</button>
                    </div>
                ))} */}
            </div>
        </div>
    </>
));
