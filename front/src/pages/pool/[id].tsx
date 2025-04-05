import React from "react";
import { useRouter } from "next/router";
import { allPools } from "@/lib/allPools";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  Breadcrumbs,
  Link,
  Rating,
  Chip,
  Container,
} from "@mui/material";
import PoolMap from "@/slices/map/Map";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import PoolGallery from "@/components/poolGallery/PoolGallery";

const PoolPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const pool = allPools.find((p) => p.id === id);

  if (!pool) {
    return (
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Typography variant="h4" textAlign="center" color="error">
          Бассейн не найден
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ color: "white", py: 2, px: 3, mb: 3, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
        >
          Выберите идеальный бассейн для вашего ребенка!
        </Typography>
      </Box>

      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3, fontSize: { xs: "0.9rem", md: "1rem" } }}
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

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "stretch",
        }}
      >
        {/* Left Column */}
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
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: { xs: "300px", sm: "400px", md: "500px" },
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
                sx={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
            >
              {pool.properties.CompanyMetaData.address}
            </Typography>
          </Paper>
        </Box>

        {/* Right Column */}
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
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  color: "blue",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                {pool.properties.CompanyMetaData.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  value={pool.properties.CompanyMetaData.rating}
                  readOnly
                  precision={0.1}
                />
                <Typography
                  variant="h4"
                  sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
                >
                  {pool.properties.CompanyMetaData.rating}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 3, fontSize: { xs: "0.9rem", md: "1rem" } }}
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
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: "1rem", md: "1.3rem" } }}
              >
                Пробное занятие
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: "1rem", md: "1.3rem" } }}
              >
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
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Записаться на пробное
            </Button>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            {pool.services && pool.services.length > 0 ? (
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {pool.services.map((service, index) => (
                  <Chip
                    key={index}
                    label={service}
                    sx={{ fontSize: { xs: "0.7rem", md: "0.9rem" } }}
                  />
                ))}
              </Stack>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
              >
                Информация о доступных услугах отсутствует.
              </Typography>
            )}
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
            >
              {pool.properties.description}
            </Typography>
          </Paper>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<WhatsAppIcon />}
              sx={{ flex: 1, fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Написать
            </Button>
            <Button
              variant="contained"
              startIcon={<PhoneIcon />}
              sx={{ flex: 1, fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              {pool.properties.CompanyMetaData.Phones?.[0]?.formatted ||
                "Позвонить"}
            </Button>
            <Button
              variant="contained"
              startIcon={<LanguageIcon />}
              sx={{ flex: 1, fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              На сайт
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Галерея */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <PoolGallery
          images={pool.images}
          title={pool.properties.CompanyMetaData.name}
        />
      </Box>
    </Container>
  );
};

export default PoolPage;
