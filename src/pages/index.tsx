import React from "react";
import SearchBar from "@/components/searchBar/SearchBar";
import PoolCards from "@/components/poolCards/PoolCards";
import PoolMap from "@/slices/map/Map";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { allPools } from "@/lib/allPools";
// import "@/pages/styles/styles.css";
// import "../pages";

const HomePage: React.FC = () => {
  const { district, ageGroup, metro } = useSelector(
    (state: RootState) => state.search
  );

  const filteredPools = allPools.filter((pool) => {
    const matchesDistrict = district
      ? pool.properties.CompanyMetaData.Categories.some((category) =>
          category.name.toLowerCase().includes(district.toLowerCase())
        )
      : true;

    const matchesAgeGroup = ageGroup
      ? pool.services?.some((service) =>
          service.toLowerCase().includes(ageGroup.toLowerCase())
        )
      : true;

    const matchesMetro = metro
      ? pool.metroStations?.some((station) =>
          station.name.toLowerCase().includes(metro.toLowerCase())
        )
      : true;

    return matchesDistrict && matchesAgeGroup && matchesMetro;
  });

  return (
    <div className="home-page">
      <section className="search-section">
        <SearchBar />
        <div className="cards-container">
          <PoolCards pools={filteredPools} />
        </div>
      </section>

      <section className="map-section">
        <div className="map-container">
          <PoolMap
            locations={filteredPools.map((pool) => ({
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
