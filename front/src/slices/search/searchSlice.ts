// src/slices/search/searchSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import PoolsService from "@/api/pools.service";
import { Pool } from "@/types/poolsTypes";

interface SearchState {
  district: string;
  ageGroup: string;
  metro: string;
  loading: boolean;
  error: string | null;
  pools: Pool[];
}

const initialState: SearchState = {
  district: "",
  ageGroup: "",
  metro: "",
  loading: false,
  error: null,
  pools: [],
};

// Асинхронное действие для получения отфильтрованных бассейнов
export const applyFilters = createAsyncThunk(
  "search/applyFilters",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { search: SearchState };
      const { district, ageGroup, metro } = state.search;

      const filters = {
        district,
        ageGroup,
        metro,
      };

      const response = await PoolsService.getAllPools(filters);
      return response.items;
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка при загрузке бассейнов");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setDistrict: (state, action: PayloadAction<string>) => {
      state.district = action.payload;
    },
    setAgeGroup: (state, action: PayloadAction<string>) => {
      state.ageGroup = action.payload;
    },
    setMetro: (state, action: PayloadAction<string>) => {
      state.metro = action.payload;
    },
    resetFilters: (state) => {
      state.district = "";
      state.ageGroup = "";
      state.metro = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.pools = action.payload;
      })
      .addCase(applyFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setDistrict, setAgeGroup, setMetro, resetFilters } =
  searchSlice.actions;
export default searchSlice.reducer;
