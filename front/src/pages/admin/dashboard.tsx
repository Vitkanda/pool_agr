import React from "react";
import Head from "next/head";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
} from "@mui/material";
import PoolIcon from "@mui/icons-material/Pool";
import PersonIcon from "@mui/icons-material/Person";
import RateReviewIcon from "@mui/icons-material/RateReview";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import AdminLayout from "@/slices/auth/AdminLayout";
import { allPools } from "@/lib/allPools";
import AdminLayout from "@/slices/auth/AdminLayout";

const AdminDashboardPage: React.FC = () => {
  // Общее количество бассейнов
  const totalPools = allPools.length;
  
  // Общее количество отзывов
  const totalReviews = allPools.reduce(
    (sum, pool) => sum + (pool.properties.CompanyMetaData.reviews?.length || 0),
    0
  );
  
  // Средний рейтинг
  const averageRating =
    allPools.reduce((sum, pool) => sum + pool.properties.CompanyMetaData.rating, 0) /
    totalPools;

  const dashboardCards = [
    {
      title: "Всего бассейнов",
      value: totalPools,
      icon: <PoolIcon fontSize="large" sx={{ color: "primary.main" }} />,
      color: "#e3f2fd",
    },
    {
      title: "Отзывы",
      value: totalReviews,
      icon: <RateReviewIcon fontSize="large" sx={{ color: "secondary.main" }} />,
      color: "#fce4ec",
    },
    {
      title: "Средний рейтинг",
      value: averageRating.toFixed(1),
      icon: <PersonIcon fontSize="large" sx={{ color: "success.main" }} />,
      color: "#e8f5e9",
    },
  ];

  // Последние добавленные бассейны (для демо берем первые 5)
  const recentPools = allPools.slice(0, 5);

  return (
    <>
      <Head>
        <title>Админ-панель | Поплаваем</title>
        <meta name="description" content="Административная панель управления детскими бассейнами" />
      </Head>

      <AdminLayout title="Панель управления">
        {/* Dashboard Cards */}
        <Grid container spacing={3} mb={4}>
          {dashboardCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: card.color,
                  borderRadius: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" component="div" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    {card.value}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {card.icon}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Recent Pools */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" component="h2">
              Недавно добавленные бассейны
            </Typography>
          </Box>

          <Stack spacing={2}>
            {recentPools.map((pool) => (
              <Card key={pool.id} sx={{ boxShadow: 1 }}>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    "&:last-child": { pb: 2 },
                  }}
                >
                  <Box>
                    <Typography variant="h6" component="div">
                      {pool.properties.CompanyMetaData.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {pool.properties.CompanyMetaData.address}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography variant="body2" component="span">
                        Рейтинг: {pool.properties.CompanyMetaData.rating}
                      </Typography>
                      <Typography variant="body2" component="span">
                        •
                      </Typography>
                      <Typography variant="body2" component="span">
                        Отзывы: {pool.properties.CompanyMetaData.reviews?.length || 0}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Paper>
      </AdminLayout>
    </>
  );
};

export default AdminDashboardPage;