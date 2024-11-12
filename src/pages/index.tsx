// src/pages/index.tsx

import React from "react";
import PoolMap from "../slices/map/Map";
import Search from "../slices/search/Search";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const HomePage: React.FC = () => {
  // Тестовые данные бассейнов с типом `[number, number]` для `coordinates`
  const allPools = [
    {
      id: "1",
      name: "Бассейн Центр",
      coordinates: [55.751244, 37.618423] as [number, number],
      district: "center",
      ageGroup: "0-1",
      price: 3000,
    },
    {
      id: "2",
      name: "Бассейн Север",
      coordinates: [55.761244, 37.628423] as [number, number],
      district: "north",
      ageGroup: "1-3",
      price: 5000,
    },
    {
      id: "3",
      name: "Бассейн Юг",
      coordinates: [55.741244, 37.608423] as [number, number],
      district: "south",
      ageGroup: "3-5",
      price: 4000,
    },
    // Добавьте больше тестовых данных по мере необходимости
  ];

  // Подключаем фильтры из Redux store
  const { district, ageGroup, priceRange } = useSelector(
    (state: RootState) => state.search
  );

  // Фильтрация бассейнов на основе выбранных критериев
  const filteredPools = allPools.filter((pool) => {
    const matchesDistrict = district ? pool.district === district : true;
    const matchesAgeGroup = ageGroup ? pool.ageGroup === ageGroup : true;
    const matchesPrice =
      pool.price >= priceRange[0] && pool.price <= priceRange[1];
    return matchesDistrict && matchesAgeGroup && matchesPrice;
  });

  return (
    <div>
      <h1>Агрегатор детских бассейнов</h1>
      <Search />
      <div>
        <p>Найдено бассейнов: {filteredPools.length}</p>
        <PoolMap locations={filteredPools} />
      </div>
    </div>
  );
};

export default HomePage;
