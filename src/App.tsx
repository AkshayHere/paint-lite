import { observer } from "mobx-react-lite";
import { ToolBar } from "./components/ToolBar";
import { ControlPanel } from "./components/ControlPanel";
import { CanvasView } from "./components/CanvasView";
import { LayersPanel } from "./components/LayersPanel";
import "./styles.css";

export const App = observer(() => {
  return (
    <div className="app">
      <ToolBar />
      <div className="main">
        <ControlPanel />
        <CanvasView />
        <LayersPanel />
      </div>
    </div>
  );
});
