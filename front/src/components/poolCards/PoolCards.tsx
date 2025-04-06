// src/components/poolCards/PoolCards.tsx
import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Alert,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";

const PoolCards: React.FC = () => {
  const router = useRouter();
  const { pools, loading, error } = useSelector(
    (state: RootState) => state.search
  );

  if (loading) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" color="white" sx={{ mt: 2 }}>
          Загрузка бассейнов...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 6 }}>
        <Alert severity="error" sx={{ maxWidth: 600, mx: "auto" }}>
          {error}
        </Alert>
      </Box>
    );
  }

  if (!Array.isArray(pools) || pools.length === 0) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h6" color="white">
          Бассейны не найдены. Попробуйте изменить параметры поиска.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 6,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, mb: 4 }}
        color="#ffffff"
      >
        Наши бассейны
      </Typography>

      <Carousel
        autoPlay={false}
        indicators={true}
        animation="slide"
        navButtonsAlwaysVisible={true}
        sx={{
          maxWidth: "100%",
          "& .MuiBox-root": {
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          },
        }}
      >
        {Array.from({ length: Math.ceil(pools.length / 3) }).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
            }}
          >
            {pools.slice(index * 3, index * 3 + 3).map((pool) => (
              <Card
                key={pool.id}
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  boxShadow: 3,
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
                onClick={() => router.push(`/pool/${pool.id}`)}
              >
                <CardMedia>
                  <Image
                    src={pool.images[0]}
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
                    Метро:{" "}
                    {pool.metroStations && pool.metroStations.length > 0
                      ? `${pool.metroStations[0].name} (${pool.metroStations[0].distance})`
                      : "Нет данных"}
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
