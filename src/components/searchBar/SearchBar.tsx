
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  setDistrict,
  setAgeGroup,
  setPriceRange,
  resetFilters,
} from "../../slices/search/searchSlice";
import styles from "./SearchBar.module.css";

const SearchBar: React.FC = () => {
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
    <div className={styles.searchBar}>
      <h1>Все детские бассейны Москвы в одном месте</h1>
      <p>Выберите бассейн для занятий рядом с домом</p>
      
      <div className={styles.filters}>
        <select 
          value={district} 
          onChange={handleDistrictChange}
          className={styles.select}
        >
          <option value="">Выберите район</option>
          <option value="center">Центр</option>
          <option value="north">Север</option>
          <option value="south">Юг</option>
          {/* Добавьте другие районы */}
        </select>

        <select 
          value={ageGroup} 
          onChange={handleAgeGroupChange}
          className={styles.select}
        >
          <option value="">Возраст ребенка</option>
          <option value="0-1">0-1 год</option>
          <option value="1-3">1-3 года</option>
          <option value="3-5">3-5 лет</option>
          <option value="5-8">5-8 лет</option>
        </select>

        <div className={styles.priceRange}>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => handlePriceRangeChange(e, 0)}
            placeholder="Цена от"
            className={styles.input}
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handlePriceRangeChange(e, 1)}
            placeholder="Цена до"
            className={styles.input}
          />
        </div>

        <button 
          onClick={() => dispatch(resetFilters())}
          className={styles.button}
        >
          Сбросить
        </button>
        
        <button className={styles.searchButton}>
          Найти
        </button>
      </div>
    </div>
  );
};

export default SearchBar;