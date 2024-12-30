import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../slices/search/searchSlice";
import mapReducer from "../slices/map/mapSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    map: mapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
