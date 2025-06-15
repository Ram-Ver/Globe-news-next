"use client";
import { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

type DrawControlProps = {
  drawnItemsRef: React.MutableRefObject<L.FeatureGroup>;
  setPolygons: React.Dispatch<React.SetStateAction<any[]>>;
  setMarkers: React.Dispatch<React.SetStateAction<any[]>>;
};

const iconUrls = [
  "/icons/marker1.png",
  "/icons/marker2.png",
  "/icons/marker3.png",
];

const createIcon = (url: string) =>
  L.icon({
    iconUrl: url,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });

export default function DrawControl({
  drawnItemsRef,
  setPolygons,
  setMarkers,
}: DrawControlProps) {
  const map = useMap();
  const controlRef = useRef<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!map) return;

    const drawnItems = drawnItemsRef.current;
    if (!drawnItems) return;
    map.addLayer(drawnItems);

    if (!controlRef.current) {
      const drawControl = new (L.Control as any).Draw({
        edit: {
          featureGroup: drawnItems,
          edit: false,
          remove: false,
        },
        draw: {
          polygon: true,
          marker: true,
          circle: false,
          polyline: false,
          rectangle: false,
          circlemarker: false,
        },
      });

      controlRef.current = drawControl;
      map.addControl(drawControl);
    }

    setTimeout(() => {
      const markerBtn = document.querySelector(
        ".leaflet-draw-draw-marker"
      ) as HTMLButtonElement;

      if (markerBtn) {
        const cloned = markerBtn.cloneNode(true) as HTMLButtonElement;
        markerBtn.parentNode?.replaceChild(cloned, markerBtn);
        cloned.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          const drawControl = controlRef.current;
          if (
            drawControl &&
            drawControl._toolbars?.draw?._modes?.marker?.handler?.disable
          ) {
            drawControl._toolbars.draw._modes.marker.handler.disable();
          }

          setModalOpen(true);
        });
      }
    }, 500);

    map.on("draw:created", (e: any) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);

      if (e.layerType === "polygon") {
        const latlngs = layer
          .getLatLngs()[0]
          .map((latlng: L.LatLng) => [latlng.lat, latlng.lng]);
        setPolygons((prev) => [
          ...prev,
          { id: crypto.randomUUID(), points: latlngs },
        ]);
      } else if (e.layerType === "marker") {
        setMarkers((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            position: layer.getLatLng(),
            iconUrl: null,
          },
        ]);
      }
    });

    return () => {
      map.off("draw:created");
      if (controlRef.current) {
        map.removeControl(controlRef.current);
        controlRef.current = null;
      }
    };
  }, [map]);

  const handleIconSelect = (url: string) => {
    const icon = createIcon(url);
    setModalOpen(false);

    const onMapClick = (e: L.LeafletMouseEvent) => {
      const latlng = e.latlng;

      const marker = L.marker(latlng, { icon }).addTo(map);
      drawnItemsRef.current.addLayer(marker);

      setMarkers((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          position: latlng,
          iconUrl: url,
        },
      ]);

      map.off("click", onMapClick);
    };

    map.once("click", onMapClick);
  };

  return (
    <>
      {modalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              Select a Marker Icon
            </h2>
            <div className="flex justify-center gap-6">
              {iconUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  className="w-10 h-14 cursor-pointer hover:scale-110 transition"
                  onClick={() => handleIconSelect(url)}
                />
              ))}
            </div>
            <button
              className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
