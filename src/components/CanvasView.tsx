import { observer } from "mobx-react-lite";
import { autorun } from "mobx";
import { useEffect, useRef } from "react";
import { editorStore } from "../store/EditorStore";
import { handleShapeClick } from "../tools/ShapeTool";
import { LayerType, ShapeType } from "../enums/CommonType";

export const CanvasView = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        const dispose = autorun(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            editorStore.layers.forEach(layer => {
                if (layer.type === LayerType.Fill) {
                    ctx.fillStyle = layer.data.color;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                if (layer.type === LayerType.Shape) {
                    ctx.fillStyle = layer.data.color;

                    if (layer.data.shape === ShapeType.Rect) {
                        ctx.fillRect(
                            layer.data.x,
                            layer.data.y,
                            layer.data.size,
                            layer.data.size
                        );
                    } else {
                        ctx.beginPath();
                        ctx.arc(
                            layer.data.x,
                            layer.data.y,
                            layer.data.size / 2,
                            0,
                            Math.PI * 2
                        );
                        ctx.fill();
                    }
                }
            });
        });

        return () => dispose();
    }, []);


    function onClick(e: React.MouseEvent) {
        if (editorStore.currentTool !== LayerType.Shape) return;
        const rect = canvasRef.current!.getBoundingClientRect();
        handleShapeClick(e.clientX - rect.left, e.clientY - rect.top);
    }

    return (
        <canvas
            ref={canvasRef}
            width={600}
            height={400}
            onClick={onClick}
            className="canvas"
        />
    );
});
