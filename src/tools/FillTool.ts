import { LayerType } from "@/enums/CommonType";
import { editorStore } from "@/store/EditorStore";
import { v4 as uuid } from "uuid";

export function applyFill() {
  editorStore.addLayer({
    id: uuid(),
    type: LayerType.Fill,
    data: {
      color: editorStore.fillColor
    }
  });
}
