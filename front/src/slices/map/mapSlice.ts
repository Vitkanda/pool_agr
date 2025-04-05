import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapState {
  center: [number, number];
  zoom: number;
}

const initialState: MapState = {
  center: [55.751244, 37.618423], // Центр Москвы
  zoom: 10,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCenter: (state, action: PayloadAction<[number, number]>) => {
      state.center = action.payload;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
  },
});

export const { setCenter, setZoom } = mapSlice.actions;
export default mapSlice.reducer;
