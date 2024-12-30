import React from "react";
// import SearchBar from '../components/SearchBar';
import SearchBar from "@/components/searchBar/SearchBar";
import PoolCards from "@/components/poolCards/PoolCards";
import PoolMap from "@/slices/map/Map";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const HomePage: React.FC = () => {
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

  const filteredPools = allPools.filter((pool) => {
    const matchesDistrict = district ? pool.district === district : true;
    const matchesAgeGroup = ageGroup ? pool.ageGroup === ageGroup : true;
    const matchesPrice =
      pool.price >= priceRange[0] && pool.price <= priceRange[1];
    return matchesDistrict && matchesAgeGroup && matchesPrice;
  });

  return (
 

    <div>
      <section style={{ height: "100vh", padding: "20px" }}>
        <SearchBar />
        <PoolCards />
      </section>
      <section style={{ height: "100vh", padding: "20px", color: "#fff" }}>
        <h2>Вторая секция</h2>
        {/* <p>Прокрутите вниз, чтобы увидеть, как фон остается на месте.</p> */}
        <PoolCards />
      </section>
      <section style={{ height: "100vh", padding: "20px", color: "#fff" }}>
        <h2>Третья секция</h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
        }}>

        <PoolMap locations={filteredPools} />
        </div>
        {/* <p>Прокрутите вниз, чтобы увидеть, как фон остается на месте.</p> */}
      </section>
    </div>
  );
};

export default HomePage;
