import { observer } from "mobx-react-lite";
import { editorStore } from "../store/EditorStore";

export const LayersPanel = observer(() => (
  <div className="layers">
    <h3>Layers</h3>
    {editorStore.layers.map((layer, i) => (
      <div key={layer.id} className="layer">
        {i + 1}. {layer.type}
        <button onClick={() => editorStore.removeLayer(layer.id)}>✕</button>
      </div>
    ))}
  </div>
));
