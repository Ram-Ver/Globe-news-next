import { Location } from "@/typescript/interfaces/globe";

const useMarkers = ({
  htmlElementCache,
  setTooltip,
  setSelectedLocation,
}: {
  htmlElementCache: React.MutableRefObject<Map<string, HTMLImageElement>>;
  setTooltip: React.Dispatch<React.SetStateAction<any>>;
  setSelectedLocation: React.Dispatch<React.SetStateAction<Location | null>>;
}) => {
  const getHtmlElement = (data: Location): HTMLImageElement => {
    if (htmlElementCache.current.has(data.key)) {
      return htmlElementCache.current.get(data.key)!;
    }

    const img = document.createElement("img");
    img.src = data.iconUrl;
    img.style.width = "32px";
    img.style.height = "32px";
    img.style.transition = "opacity 250ms";
    img.style.pointerEvents = "auto";
    img.style.cursor = "pointer";
    img.title = data.label;

    img.onerror = () => {
      img.src = "/icons/marker1.png";
    };

    img.onclick = (e: MouseEvent) => {
      const target = e.target as HTMLImageElement;
      const boundingRect = target.getBoundingClientRect();

      const newX = boundingRect.left + boundingRect.width / 2;
      const newY = boundingRect.top;

      setTooltip({
        x: newX,
        y: newY,
        label: data.label,
        key: data.key,
        description: data.description,
        visible: true,
      });

      setSelectedLocation(data);
    };

    htmlElementCache.current.set(data.key, img);
    return img;
  };

  return { getHtmlElement };
};

export default useMarkers;
