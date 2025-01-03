import React from "react";
import { useRouter } from "next/router";
import { allPools } from "@/lib/allPools"; // Импортируем массив всех бассейнов
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import Image from "next/image";

const PoolPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Получаем id из маршрута

  // Находим бассейн по id
  const pool = allPools.find((p) => p.id === id);

  if (!pool) {
    return <Typography variant="h4">Бассейн не найден</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", p: 4 }}>
      <Card sx={{ boxShadow: 3 }}>
        <CardMedia>
          <Image
            src={pool.images[0]}
            alt={pool.name}
            width={800}
            height={400}
            style={{ objectFit: "cover" }}
          />
        </CardMedia>
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            {pool.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Район: {pool.district}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Метро: {pool.metroStation}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Адрес: {pool.address}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            График: {pool.schedule}
          </Typography>
          <Typography variant="body1" color="primary" sx={{ fontWeight: 500 }}>
            Рейтинг: {pool.rating} ★
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {pool.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PoolPage;
