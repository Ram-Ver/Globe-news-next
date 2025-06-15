import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Marker {
  lat: number;
  lng: number;
  label: string;
}

interface MarkerState {
  markers: Marker[];
}

const initialState: MarkerState = {
  markers: [],
};

const markerSlice = createSlice({
  name: 'marker',
  initialState,
  reducers: {
    setMarkers: (state, action: PayloadAction<Marker[]>) => {
      state.markers = action.payload;
    },
    addMarker: (state, action: PayloadAction<Marker>) => {
      state.markers.push(action.payload);
    },
  },
});

export const { setMarkers, addMarker } = markerSlice.actions;
export default markerSlice.reducer;
