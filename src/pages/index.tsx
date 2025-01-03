import React from "react";
import SearchBar from "@/components/searchBar/SearchBar";
import PoolCards from "@/components/poolCards/PoolCards";
import PoolMap from "@/slices/map/Map";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { allPools } from "@/lib/allPools";

const HomePage: React.FC = () => {
  const { district, ageGroup, metro } = useSelector(
    (state: RootState) => state.search
  );

  const filteredPools = allPools.filter((pool) => {
    const matchesDistrict = district ? pool.district === district : true;
    const matchesAgeGroup = ageGroup ? pool.ageGroups.includes(ageGroup) : true;
    const matchesMetro = metro ? pool.metroStation === metro : true;
    return matchesDistrict && matchesAgeGroup && matchesMetro;
  });

  return (
    <div>
      <section style={{ height: "100vh", padding: "20px" }}>
        <SearchBar />
        <PoolCards pools={filteredPools} />
      </section>
      {/* <section style={{ height: "100vh", padding: "20px", color: "#fff" }}>
        <h2>Вторая секция</h2>
        <PoolCards pools={filteredPools} />
      </section> */}
      <section style={{ height: "100vh", padding: "20px", color: "#fff" }}>
        <h2>Третья секция</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PoolMap locations={filteredPools} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
