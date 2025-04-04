import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../slices/search/searchSlice";
import mapReducer from "../slices/map/mapSlice";
import authReducer from "../slices/auth/authSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    map: mapReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Отключаем проверку сериализуемости для localStorage
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;