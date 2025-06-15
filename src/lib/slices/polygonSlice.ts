import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Polygon } from "@/typescript/interfaces/polygon";

interface PolygonState {
  data: Polygon[];
  loading: boolean;
  error: string | null;
}

const initialState: PolygonState = {
  data: [],
  loading: false,
  error: null,
};

// Thunk for fetching polygon data
export const fetchPolygons = createAsyncThunk(
  "polygon/fetchPolygons",
  async () => {
    const response = await axios.get("https://your-api-url.com/polygons");
    return response.data as Polygon[];
  }
);

const polygonSlice = createSlice({
  name: "polygon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolygons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPolygons.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPolygons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch polygons";
      });
  },
});

export default polygonSlice.reducer;
