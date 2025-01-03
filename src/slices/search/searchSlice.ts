// // src/slices/search/searchSlice.ts

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface SearchState {
//     district: string;
//     ageGroup: string;
//     priceRange: [number, number];
// }

// const initialState: SearchState = {
//     district: '',
//     ageGroup: '',
//     priceRange: [0, 10000], 
// };

// const searchSlice = createSlice({
//     name: 'search',
//     initialState,
//     reducers: {
//         setDistrict: (state, action: PayloadAction<string>) => {
//             state.district = action.payload;
//         },
//         setAgeGroup: (state, action: PayloadAction<string>) => {
//             state.ageGroup = action.payload;
//         },
//         setPriceRange: (state, action: PayloadAction<[number, number]>) => {
//             state.priceRange = action.payload;
//         },
//         resetFilters: (state) => {
//             state.district = '';
//             state.ageGroup = '';
//             state.priceRange = [0, 10000];
//         },
//     },
// });

// export const { setDistrict, setAgeGroup, setPriceRange, resetFilters } = searchSlice.actions;
// export default searchSlice.reducer;



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
