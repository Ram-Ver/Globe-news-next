export interface Marker {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description: string;
  date: string;
}

export interface CreateMarkerPayload {
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
}

export interface UpdateMarkerPayload extends Partial<CreateMarkerPayload> {
  id: string;
}
