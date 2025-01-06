import React from "react";
import { useRouter } from "next/router";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";
import { Pool } from "@/types/poolsTypes";

interface PoolCardsProps {
  pools: Pool[];
}

const PoolCards: React.FC<PoolCardsProps> = ({ pools }) => {
  const router = useRouter();

  // Функция для разделения массива на чанки
  const chunkPools = (arr: Pool[], size: number) =>
    arr.reduce<Pool[][]>((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);

  const poolChunks = chunkPools(pools, 3); // Разбиваем по 3 бассейна

  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, mb: 4 }}
      >
        Наши бассейны
      </Typography>
      <Carousel
        autoPlay={true}
        indicators={true}
        animation="slide"
        navButtonsAlwaysVisible={true}
        sx={{ maxWidth: "100%" }}
      >
        {poolChunks.map((chunk, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              px: 2,
            }}
          >
            {chunk.map((pool) => (
              <Card
                key={pool.id}
                sx={{
                  maxWidth: 400,
                  boxShadow: 3,
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer", // Указатель при наведении
                }}
                onClick={() => router.push(`/pool/${pool.id}`)} // Переход по клику
              >
                <CardMedia>
                  <Image
                    src={pool.images[0]} // Отображение первой картинки
                    alt={pool.properties.CompanyMetaData.name}
                    width={400}
                    height={250}
                    style={{ objectFit: "cover" }}
                  />
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {pool.properties.CompanyMetaData.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Адрес: {pool.properties.CompanyMetaData.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Метро: {pool.metroStations && pool.metroStations.join(", ")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Цена: Индивидуально - {pool.priceRange.individual}₽
                    {pool.priceRange.group &&
                      `, Групповой - ${pool.priceRange.group}₽`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    График:{" "}
                    {pool.properties.CompanyMetaData.Hours?.text ||
                      "Не указано"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ mt: 1, fontWeight: 500 }}
                  >
                    Рейтинг: {pool.properties.CompanyMetaData.rating} ★
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default PoolCards;
