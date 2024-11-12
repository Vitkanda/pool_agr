// src/slices/search/Search.tsx

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  setDistrict,
  setAgeGroup,
  setPriceRange,
  resetFilters,
} from "./searchSlice";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const { district, ageGroup, priceRange } = useSelector(
    (state: RootState) => state.search
  );

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setDistrict(e.target.value));
  };

  const handleAgeGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setAgeGroup(e.target.value));
  };

  const handlePriceRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPriceRange = [...priceRange] as [number, number];
    newPriceRange[index] = Number(e.target.value);
    dispatch(setPriceRange(newPriceRange));
  };

  return (
    <div>
      <h2>Фильтры</h2>
      <div>
        <label>Район</label>
        <select value={district} onChange={handleDistrictChange}>
          <option value="">Выберите район</option>
          <option value="center">Центр</option>
          <option value="north">Север</option>
          <option value="south">Юг</option>
          {/* Добавьте другие районы */}
        </select>
      </div>

      <div>
        <label>Возрастная группа</label>
        <select value={ageGroup} onChange={handleAgeGroupChange}>
          <option value="">Выберите возраст</option>
          <option value="0-1">0-1 год</option>
          <option value="1-3">1-3 года</option>
          <option value="3-5">3-5 лет</option>
          <option value="5-8">5-8 лет</option>
        </select>
      </div>

      <div>
        <label>Диапазон цен</label>
        <input
          type="number"
          value={priceRange[0]}
          onChange={(e) => handlePriceRangeChange(e, 0)}
          placeholder="Минимум"
        />
        <input
          type="number"
          value={priceRange[1]}
          onChange={(e) => handlePriceRangeChange(e, 1)}
          placeholder="Максимум"
        />
      </div>

      <button onClick={() => dispatch(resetFilters())}>Сбросить фильтры</button>
    </div>
  );
};

export default Search;
