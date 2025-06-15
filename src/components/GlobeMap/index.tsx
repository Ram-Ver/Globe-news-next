"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Vector3, PerspectiveCamera } from "three";
import { AreaPolygon, Location, Tooltip } from "@/typescript/interfaces/globe";
import { Feature, Polygon as GeoJsonPolygon, Polygon } from "geojson";
import {
  areaSelected,
  getRandomMilitarySentence,
  markerIcons,
} from "@/utils/globeMap";
import { getMarkers } from "@/lib/api/markers";
import useMarkers from "@/hooks/useMarkers";
import TooltipBox from "./Tooltip";
import Controls from "./Controls";
import { Controllers } from "@/typescript/enums";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface GeoJsonFeatureProperties {
  id: string;
  color: string;
}

export default function GlobeMap() {
  const globeRef = useRef<any>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const htmlElementCache = useRef<Map<string, HTMLImageElement>>(new Map());

  const [areaPolygons, setAreaPolygons] = useState<AreaPolygon[]>(areaSelected);
  const [tooltip, setTooltip] = useState<Tooltip>({
    x: 0,
    y: 0,
    label: "",
    key: "",
    description: "",
    visible: false,
  });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [activeTool, setActiveTool] = useState<Controllers | null>(
    Controllers.Marker
  );

  const [locations, setLocations] = useState<Location[]>(() => {
    return Array.from({ length: 100 }, (_, i) => {
      const lat = Math.random() * 180 - 90;
      const lng = Math.random() * 360 - 180;
      return {
        lat,
        lng,
        label: `Marker ${i + 1}`,
        key: `${Date.now()}-${Math.random()}-${i}`,
        iconUrl: markerIcons[Math.floor(Math.random() * markerIcons.length)],
        description: getRandomMilitarySentence(),
      };
    });
  });

  const geoJsonPolygons: Feature<Polygon, GeoJsonFeatureProperties>[] =
    areaPolygons.map((item) => ({
      type: "Feature",
      properties: { id: item.id, color: item.color },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            ...item.polygon.map(([lat, lng]) => [lng, lat]),
            [item.polygon[0][1], item.polygon[0][0]],
          ],
        ],
      },
    }));

  const { getHtmlElement } = useMarkers({
    htmlElementCache,
    setTooltip,
    setSelectedLocation,
  });

  useEffect(() => {
    getMarkers().then(console.log).catch(console.error);
  }, []);

  useEffect(() => {
    globeRef.current?.pointOfView({ lat: 20, lng: 10, altitude: 2 }, 2000);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !tooltipRef.current?.contains(e.target as Node) &&
        (e.target as HTMLElement).tagName !== "IMG"
      ) {
        setTooltip((prev) => ({ ...prev, visible: false }));
        setSelectedLocation(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!selectedLocation || !tooltip.visible) return;
    const globe = globeRef.current;
    const camera = globe?.camera();
    const renderer = globe?.renderer();
    const controls = globe?.controls();

    if (!globe || !camera || !renderer || !controls) return;

    const updateTooltipPosition = () => {
      const coords = globe.getCoords(
        selectedLocation.lat,
        selectedLocation.lng
      );
      if (!coords) return;
      const vec = new Vector3(coords.x, coords.y, coords.z).project(
        camera as PerspectiveCamera
      );
      const halfW = renderer.domElement.clientWidth / 2;
      const halfH = renderer.domElement.clientHeight / 2;
      setTooltip((prev) => ({
        ...prev,
        x: vec.x * halfW + halfW,
        y: -vec.y * halfH + halfH,
      }));
    };

    controls.addEventListener("change", updateTooltipPosition);
    updateTooltipPosition();
    return () => controls.removeEventListener("change", updateTooltipPosition);
  }, [selectedLocation, tooltip.visible]);

  return (
    <div className="w-full max-h-screen relative">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        htmlElementsData={locations}
        htmlElement={(d: unknown) => getHtmlElement(d as Location)}
        htmlElementVisibilityModifier={(el, isVisible) =>
          (el.style.opacity = isVisible ? "1" : "0")
        }
        polygonsData={geoJsonPolygons}
        polygonSideColor={() => "rgba(0, 100, 100, 0.15)"}
        polygonStrokeColor={() => "#111"}
        polygonAltitude={0.01}
        polygonCapColor={(feat) => {
          const properties = (
            feat as Feature<Polygon, GeoJsonFeatureProperties>
          ).properties;
          return properties?.color;
        }}
        polygonLabel={(feat) => {
          const properties = (
            feat as Feature<Polygon, GeoJsonFeatureProperties>
          ).properties;
          return `Zone: ${properties?.id}`;
        }}
      />
      {tooltip.visible && (
        <TooltipBox tooltip={tooltip} tooltipRef={tooltipRef} />
      )}
      <Controls activeTool={activeTool} setActiveTool={setActiveTool} />
    </div>
  );
}
