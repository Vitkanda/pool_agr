import React from "react";
import { useRouter } from "next/router";
import { allPools } from "@/lib/allPools";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Stack,
  Paper,
  Breadcrumbs,
  Link,
  Rating,
  Chip,
  Container,
} from "@mui/material";
import Image from "next/image";
import PoolMap from "@/slices/map/Map";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";

const PoolPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const pool = allPools.find((p) => p.id === id);

  if (!pool) {
    return <Typography variant="h4">Бассейн не найден</Typography>;
  }

  // console.log("pool===========>>>>>>", pool);

  return (
    <Container maxWidth="xl">
      <Box sx={{ color: "white", py: 2, px: 3, mb: 3 }}>
        <Typography variant="h3">
          Выберите идеальный бассейн для вашего ребенка!
        </Typography>
      </Box>

      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <Link href="/" color="inherit" underline="hover">
          Главная
        </Link>
        <Link href="/pools" color="inherit" underline="hover">
          Бассейны
        </Link>
        <Typography color="text.primary">
          {pool.properties.CompanyMetaData.name}
        </Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Paper
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              mb: 3,
            }}
          >
            <PoolMap
              locations={[
                {
                  id: pool.id,
                  name: pool.properties.CompanyMetaData.name,
                  coordinates: pool.geometry.coordinates,
                },
              ]}
              sx={{
                width: "100%",
                flex: 1,
                borderRadius: "12px",
              }}
            />
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant="body1">
              {pool.properties.CompanyMetaData.address}
            </Typography>
          </Paper>
        </Box>

        {/* Правая колонка с информацией */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="h4" component="h1" sx={{ color: "blue" }}>
                {pool.properties.CompanyMetaData.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  value={pool.properties.CompanyMetaData.rating}
                  readOnly
                  precision={0.1}
                />
                <Typography variant="h4">
                  {pool.properties.CompanyMetaData.rating}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Метро:{" "}
              {pool.metroStations && pool.metroStations.length > 0
                ? pool.metroStations
                    .map((station) => `${station.name} (${station.distance})`)
                    .join(", ")
                : "Нет данных"}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="h5">Пробное занятие</Typography>
              <Typography variant="h5">
                {pool.priceRange.trial
                  ? `${pool.priceRange.trial} ₽`
                  : "Нет данных"}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 2, display: "block" }}
            >
              При покупке абонемента – в подарок!
            </Typography>
            <Button variant="contained" fullWidth size="large">
              Записаться на пробное
            </Button>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            {pool.services && pool.services.length > 0 ? (
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {pool.services.map((service, index) => (
                  <Chip key={index} label={service} />
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Информация о доступных услугах отсутствует.
              </Typography>
            )}
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="body1">
              {pool.properties.description}
            </Typography>
          </Paper>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<WhatsAppIcon />}
              sx={{ flex: 1 }}
            >
              Написать
            </Button>
            <Button
              variant="contained"
              startIcon={<PhoneIcon />}
              sx={{ flex: 1 }}
            >
              {pool.properties.CompanyMetaData.Phones?.[0]?.formatted ||
                "Позвонить"}
            </Button>
            <Button
              variant="contained"
              startIcon={<LanguageIcon />}
              sx={{ flex: 1 }}
            >
              На сайт
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Галерея */}
      {/* <Box sx={{ mt: 4, display: 'flex', alignContent: 'center' }} >
        <Typography variant="h4" sx={{ mb: 3, color: 'white' }}>
          Занятия в &quot;{pool.properties.CompanyMetaData.name}&quot;
        </Typography>
 

        <Stack
          direction="row"
          spacing={2}
          sx={{
            overflowX: "auto",
            pb: 2,
            "&::-webkit-scrollbar": { height: 8 },
            "&::-webkit-scrollbar-track": { bgcolor: "#f1f1f1" },
            "&::-webkit-scrollbar-thumb": { bgcolor: "#888", borderRadius: 4 },
          }}
        >
          {pool.images.map((image, index) => (
            <Card key={index} sx={{ minWidth: 280, bgcolor: "#f5f5f5" }}>
              <CardMedia>
                <Image
                  src={image}
                  alt={`Фото ${index + 1}`}
                  width={280}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
              </CardMedia>
            </Card>
          ))}
        </Stack>
      </Box> */}


          {/* Галерея */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 3, color: 'white' }}>
          Занятия в &quot;{pool.properties.CompanyMetaData.name}&quot;
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center" // Центрирование элементов
          sx={{
            overflowX: "auto",
            pb: 2,
            "&::-webkit-scrollbar": { height: 8 },
            "&::-webkit-scrollbar-track": { bgcolor: "#f1f1f1" },
            "&::-webkit-scrollbar-thumb": { bgcolor: "#888", borderRadius: 4 },
          }}
        >
          {pool.images.map((image, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 280,
                bgcolor: "#f5f5f5",
                mx: "auto", // Центрирование карточек
              }}
            >
              <CardMedia>
                <Image
                  src={image}
                  alt={`Фото ${index + 1}`}
                  width={280}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
              </CardMedia>
            </Card>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default PoolPage;
