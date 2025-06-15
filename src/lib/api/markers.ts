import {
  CreateMarkerPayload,
  Marker,
  UpdateMarkerPayload,
} from "@/typescript/interfaces/markers";
import api from "../axios";

export const getMarkers = async (): Promise<Marker[]> => {
  const response = await api.get<Marker[]>("/marker");
  return response.data;
};

export const getMarkerById = async (id: string): Promise<Marker> => {
  const response = await api.get<Marker>(`/marker/${id}`);
  return response.data;
};

export const createMarker = async (
  payload: CreateMarkerPayload
): Promise<Marker> => {
  const response = await api.post<Marker>("/marker", payload);
  return response.data;
};

export const updateMarker = async (
  payload: UpdateMarkerPayload
): Promise<Marker> => {
  const { id, ...rest } = payload;
  const response = await api.put<Marker>(`/marker/${id}`, rest);
  return response.data;
};

export const deleteMarker = async (id: string): Promise<void> => {
  await api.delete(`/marker/${id}`);
};
