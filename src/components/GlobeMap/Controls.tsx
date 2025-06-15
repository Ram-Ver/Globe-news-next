import { Controllers } from "@/typescript/enums";
import { FaMapMarkerAlt, FaDrawPolygon, FaSlash } from "react-icons/fa";

type Props = {
  activeTool: Controllers| null;
  setActiveTool: (tool: Controllers) => void;
};

export default function Controls({ activeTool, setActiveTool }: Props) {
  return (
    <div className="absolute bottom-[100px] left-5 bg-black/60 p-2 rounded-lg flex flex-col gap-2 text-white">
      <button onClick={() => setActiveTool(Controllers.Marker)} title="Place Marker">
        <FaMapMarkerAlt color={activeTool === "marker" ? "red" : "white"} />
      </button>
      <button onClick={() => setActiveTool(Controllers.Polygon)} title="Draw Polygon">
        <FaDrawPolygon color={activeTool === "polygon" ? "red" : "white"} />
      </button>
      <button onClick={() => setActiveTool(Controllers.Line)} title="Draw Line">
        <FaSlash color={activeTool === "line" ? "red" : "white"} />
      </button>
    </div>
  );
}
