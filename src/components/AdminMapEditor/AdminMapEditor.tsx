"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { MarkerItem, PolygonItem } from "@/typescript/types/AdminMap";
import DrawControl from "./DrawControl";
import PolygonList from "./PolygonList";
import MarkerList from "./Marker/MarkerList";

export default function AdminMapEditor() {
  const [polygons, setPolygons] = useState<PolygonItem[]>([]);
  const [markers, setMarkers] = useState<MarkerItem[]>([]);
  const drawnItemsRef = useRef<L.FeatureGroup>(new L.FeatureGroup());

  const value = useSelector((state: RootState) => state.marker);
  const dispatch = useDispatch();

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);

  const handleEditPolygon = (id: string) => {
    const drawnItems = drawnItemsRef.current;

    drawnItems.eachLayer((layer: L.Layer) => {
      if (layer instanceof L.Polygon) {
        const rawLatLngs = layer.getLatLngs();
        const latlngs: [number, number][] =
          Array.isArray(rawLatLngs) && Array.isArray(rawLatLngs[0])
            ? (rawLatLngs[0] as L.LatLng[]).map((latlng) => [
                latlng.lat,
                latlng.lng,
              ])
            : [];

        const polygon = polygons.find(
          (p) => JSON.stringify(p.points) === JSON.stringify(latlngs)
        );

        if (polygon && polygon.id === id) {
          const editableLayer = layer as any;
          editableLayer.editing.enable();

          editableLayer.on("edit", () => {
            const updatedRaw = editableLayer.getLatLngs();
            const updatedLatLngs: [number, number][] =
              Array.isArray(updatedRaw) && Array.isArray(updatedRaw[0])
                ? (updatedRaw[0] as L.LatLng[]).map((latlng) => [
                    latlng.lat,
                    latlng.lng,
                  ])
                : [];

            setPolygons((prev) =>
              prev.map((poly) =>
                poly.id === id ? { ...poly, points: updatedLatLngs } : poly
              )
            );

            editableLayer.editing.disable();
          });
        }
      }
    });
  };

  const handleDeletePolygon = (id: string) => {
    const target = polygons.find((poly) => poly.id === id);
    if (target) {
      drawnItemsRef.current.eachLayer((layer: L.Layer) => {
        if (layer instanceof L.Polygon) {
          const rawLatLngs = layer.getLatLngs();
          const latlngs: [number, number][] =
            Array.isArray(rawLatLngs) && Array.isArray(rawLatLngs[0])
              ? (rawLatLngs[0] as L.LatLng[]).map((latlng) => [
                  latlng.lat,
                  latlng.lng,
                ])
              : [];
          if (JSON.stringify(latlngs) === JSON.stringify(target.points)) {
            drawnItemsRef.current.removeLayer(layer);
          }
        }
      });
    }

    setPolygons((prev) => prev.filter((poly) => poly.id !== id));
  };

  const handleDeleteMarker = (id: string) => {
    const target = markers.find((m) => m.id === id);
    if (target) {
      drawnItemsRef.current.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          const { lat, lng } = layer.getLatLng();
          const pos = target.position as any;
          const iconUrl = layer.options.icon?.options?.iconUrl;

          if (
            lat === pos.lat &&
            lng === pos.lng &&
            iconUrl === target.iconUrl
          ) {
            drawnItemsRef.current.removeLayer(layer);
          }
        }
      });
    }

    setMarkers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleEdit = (id: string, title: string, description: string) => {
    setMarkers(
      markers.map((marker) =>
        marker.id === id ? { ...marker, title, description } : marker
      )
    );
  };

  useEffect(() => {
    console.log(markers, "markers");
  });

  return (
    <div className="relative">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        className="h-[600px] w-full z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <DrawControl
          drawnItemsRef={drawnItemsRef}
          setPolygons={setPolygons}
          setMarkers={setMarkers}
        />
        <PolygonList
          polygons={polygons}
          onEdit={handleEditPolygon}
          onDelete={handleDeletePolygon}
        />
        <MarkerList
          markers={markers}
          onDelete={handleDeleteMarker}
          onEdit={handleEdit}
        />
      </MapContainer>
    </div>
  );
}
