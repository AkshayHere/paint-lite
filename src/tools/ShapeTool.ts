import { LayerType } from "../enums/CommonType";
import { editorStore } from "../store/EditorStore";
import { v4 as uuid } from "uuid";

export function handleShapeClick(x: number, y: number) {
  editorStore.addLayer({
    id: uuid(),
    type: LayerType.Shape,
    data: {
      x,
      y,
      shape: editorStore.shapeType,
      color: editorStore.shapeColor,
      size: 60
    }
  });
}
