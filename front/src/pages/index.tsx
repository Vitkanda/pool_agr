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

  console.log("pools for map", JSON.stringify(pools));

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

      <section
        className="map-section"
        style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}
      >
        <div className="map-container">
          <PoolMap
            locations={
              Array.isArray(pools)
                ? pools.map((pool) => ({
                    id: pool.id,
                    name: pool.properties.CompanyMetaData.name,
                    coordinates: [
                      pool.geometry.coordinates[1],
                      pool.geometry.coordinates[0],
                    ],
                  }))
                : []
            }
            sx={{ width: "800px", height: "400px", borderRadius: "12px" }}
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
