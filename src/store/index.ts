// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../slices/map/mapSlice';
import searchReducer from '../slices/search/searchSlice';

const store = configureStore({
    reducer: {
        map: mapReducer,
        search: searchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;