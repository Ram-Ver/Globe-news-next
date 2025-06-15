import { Tooltip } from "@/typescript/interfaces/globe";
import { RefObject } from "react";

type Props = {
  tooltip: Tooltip;
  tooltipRef: RefObject<HTMLDivElement | null>;
};

export default function TooltipBox({ tooltip, tooltipRef }: Props) {
  return (
    <div
      ref={tooltipRef}
      className="absolute z-[1000] pointer-events-auto max-w-sm px-5 py-4 rounded-xl shadow-2xl text-gray-800 transform -translate-y-1/2 backdrop-blur-md border border-white/30 bg-white"
      style={{ top: tooltip.y, left: tooltip.x + 20 }}
    >
      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-t border-l border-white/30 rotate-45 shadow-md backdrop-blur-md" />
      <div className="space-y-1 w-[200px]">
        <strong className="block text-lg font-semibold text-gray-900">{tooltip.label}</strong>
        <p className="text-sm leading-relaxed text-gray-700">{tooltip.description}</p>
      </div>
    </div>
  );
}
