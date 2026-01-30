import { observer } from "mobx-react-lite";
import { autorun } from "mobx";
import { useEffect, useRef } from "react";
import { editorStore } from "@/store/EditorStore";
import { handleShapeClick } from "@/tools/ShapeTool";
import { LayerType, ShapeType, ToolType } from "@/enums/CommonType";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@/constants/ui";

export const CanvasView = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        const dispose = autorun(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            editorStore.layers.forEach(layer => {
                switch (layer.type) {
                    case LayerType.Fill:
                        ctx.fillStyle = layer.data.color;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        break;
                    case LayerType.Shape:
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
                        break;
                    case LayerType.Brush:
                        ctx.strokeStyle = layer.data.color;
                        ctx.lineWidth = layer.data.size;
                        ctx.beginPath();
                        ctx.moveTo(layer.data.points[0].x, layer.data.points[0].y);
                        for (let i = 1; i < layer.data.points.length; i++) {
                            ctx.lineTo(layer.data.points[i].x, layer.data.points[i].y);
                        }
                        ctx.stroke();
                        break;
                
                    default:
                        break;
                }
            });
        });

        return () => dispose();
    }, []);


    function onClick(e: React.MouseEvent) {
        if (editorStore.currentTool !== ToolType.Shape) return;
        const rect = canvasRef.current!.getBoundingClientRect();
        handleShapeClick(e.clientX - rect.left, e.clientY - rect.top);
    }

    function getMousePos(
        e: React.MouseEvent,
        canvas: HTMLCanvasElement
    ) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    function onMouseDown(e: React.MouseEvent) {
        if (editorStore.currentTool !== ToolType.Brush) return;
        editorStore.startPath(getMousePos(e, canvasRef.current!));
    }

    function onMouseMove(e: React.MouseEvent) {
        if (editorStore.currentTool !== ToolType.Brush) return;
        editorStore.addPoint(getMousePos(e, canvasRef.current!));
    }

    function onMouseUp() {
        if (editorStore.currentTool !== ToolType.Brush) return;
        editorStore.endPath();
    }


    return (
        <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            className="canvas"
        />
    );
});
