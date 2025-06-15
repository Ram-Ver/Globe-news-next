import L from "leaflet";

export interface Location {
  lat: number;
  lng: number;
  label: string;
  key: string;
  iconUrl: string;
  description: string;
}

export interface AreaPolygon {
  id: string;
  polygon: [number, number][];
  color: string;
}

export interface Tooltip {
  x: number;
  y: number;
  label: string;
  key: string;
  description: string;
  visible: boolean;
}

export interface EditablePolygon extends L.Polygon {
  editing: {
    enable: () => void;
    disable: () => void;
  };
}
