

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./PoolCards.module.css";

const PoolCards: React.FC = () => {
  const pools = [
    {
      id: 1,
      name: "Акватория",
      rating: 5,
      price: "1500₽",
      address: "ул. Пушкина, 1",
      hours: "08:00 - 22:00",
      image: "/images/akademy.webp",
    },
    {
      id: 2,
      name: "Китенок",
      rating: 4,
      price: "1200₽",
      address: "ул. Ленина, 12",
      hours: "09:00 - 20:00",
      image: "/images/kiteonok.webp",
    },
    {
        id: 3,
        name: "Аквакласс",
        rating: 4,
        price: "2200₽",
        address: "ул. Бажлва, 5",
        hours: "09:00 - 20:00",
        image: "/images/kiteonok.webp",
      },
    // Добавьте больше данных
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.poolCards}>
      <h2>Наши бассейны</h2>
      <Slider {...settings}>
        {pools.map((pool) => (
          <div key={pool.id} className={styles.card}>
            <img src={pool.image} alt={pool.name} className={styles.image} />
            <div className={styles.info}>
              <h3 className={styles.name}>{pool.name}</h3>
              <p className={styles.rating}>Рейтинг: {pool.rating} ★</p>
              <p className={styles.price}>Цена: {pool.price}</p>
              <p className={styles.address}>{pool.address}</p>
              <p className={styles.hours}>Время работы: {pool.hours}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PoolCards;
