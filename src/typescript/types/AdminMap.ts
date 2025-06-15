import { LatLngExpression } from "leaflet";
export type PolygonPoint = [number, number];
export type PolygonItem = {
  id: string;
  points: PolygonPoint[];
};

export type MarkerItem = {
  id: string;
  position: any;
  iconUrl?: string;
  title: string;
  description: string;
  lat: string;
  lng: string;
};
