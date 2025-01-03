
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    district: string;
    ageGroup: string;
    metro: string; // Новое поле для станции метро
}

const initialState: SearchState = {
    district: '',
    ageGroup: '',
    metro: '', // По умолчанию пустое значение
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setDistrict: (state, action: PayloadAction<string>) => {
            state.district = action.payload;
        },
        setAgeGroup: (state, action: PayloadAction<string>) => {
            state.ageGroup = action.payload;
        },
        setMetro: (state, action: PayloadAction<string>) => { // Новый редьюсер для установки метро
            state.metro = action.payload;
        },
        resetFilters: (state) => { // Сбрасывает все фильтры
            state.district = '';
            state.ageGroup = '';
            state.metro = '';
        },
    },
});

export const { setDistrict, setAgeGroup, setMetro, resetFilters } = searchSlice.actions;
export default searchSlice.reducer;
