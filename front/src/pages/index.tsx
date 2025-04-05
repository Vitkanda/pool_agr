// src/pages/index.tsx
import React, { useEffect } from "react";
import SearchBar from "@/components/searchBar/SearchBar";
import PoolCards from "@/components/poolCards/PoolCards";
import PoolMap from "@/slices/map/Map";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { applyFilters } from "@/slices/search/searchSlice";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pools } = useSelector((state: RootState) => state.search);

  // Загрузка бассейнов при первом рендере
  useEffect(() => {
    dispatch(applyFilters());
  }, [dispatch]);

  return (
    <div className="home-page">
      <section className="search-section">
        <SearchBar />
        <div className="cards-container">
          <PoolCards />
        </div>
      </section>

      <section className="map-section">
        <div className="map-container">
          <PoolMap
            locations={pools.map((pool) => ({
              id: pool.id,
              name: pool.properties.CompanyMetaData.name,
              coordinates: pool.geometry.coordinates,
            }))}
            sx={{ width: "100%", height: "100%", borderRadius: "12px" }}
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
