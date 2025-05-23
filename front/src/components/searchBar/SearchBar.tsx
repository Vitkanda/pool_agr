// src/components/searchBar/SearchBar.tsx
import React from "react";

import {
  setDistrict,
  setAgeGroup,
  setMetro,
  resetFilters,
  applyFilters,
} from "../../slices/search/searchSlice";
import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Paper,
  useTheme,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { metroStations } from "./metroStations";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";

const SearchBar: React.FC = () => {
  const theme = useTheme();
  // const dispatch = useDispatch();

  const dispatch = useDispatch<AppDispatch>();

  const { district, ageGroup, metro, loading } = useSelector(
    (state: RootState) => state.search
  );

  const handleDistrictChange = (e: SelectChangeEvent<string>) => {
    dispatch(setDistrict(e.target.value as string));
  };

  const handleAgeGroupChange = (e: SelectChangeEvent<string>) => {
    dispatch(setAgeGroup(e.target.value as string));
  };

  const handleMetroChange = (e: SelectChangeEvent<string>) => {
    dispatch(setMetro(e.target.value as string));
  };

  const handleSearch = () => {
    dispatch(applyFilters()); // Новое действие для получения данных с API
  };

  return (
    <Box
      sx={{
        py: 6,
        borderRadius: 2,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "3rem" },
            color: "#ffffff",
          }}
        >
          Все детские бассейны Москвы в одном месте
        </Typography>
        <Typography variant="h6" align="center" color="#ffffff" sx={{ mb: 4 }}>
          Выберите бассейн для занятий рядом с домом
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems="center"
          >
            <FormControl fullWidth>
              <InputLabel>Район</InputLabel>
              <Select
                value={district}
                label="Район"
                onChange={handleDistrictChange}
                sx={{ bgcolor: "white" }}
                disabled={loading}
              >
                <MenuItem value="">Все районы</MenuItem>
                <MenuItem value="center">Центр</MenuItem>
                <MenuItem value="north">Север</MenuItem>
                <MenuItem value="south">Юг</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Возраст ребенка</InputLabel>
              <Select
                value={ageGroup}
                label="Возраст ребенка"
                onChange={handleAgeGroupChange}
                sx={{ bgcolor: "white" }}
                disabled={loading}
              >
                <MenuItem value="">Любой возраст</MenuItem>
                <MenuItem value="0-1">0-1 год</MenuItem>
                <MenuItem value="1-3">1-3 года</MenuItem>
                <MenuItem value="3-5">3-5 лет</MenuItem>
                <MenuItem value="5-8">5-8 лет</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Метро</InputLabel>
              <Select
                value={metro}
                label="Метро"
                onChange={handleMetroChange}
                sx={{ bgcolor: "white" }}
                disabled={loading}
              >
                <MenuItem value="">Все станции</MenuItem>
                {metroStations.map((station) => (
                  <MenuItem key={station} value={station}>
                    {station}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{ width: { xs: "100%", md: "auto" } }}
            >
              <Button
                variant="outlined"
                onClick={() => dispatch(resetFilters())}
                startIcon={<RestartAltIcon />}
                sx={{ width: { xs: "100%", md: "auto" } }}
                disabled={loading}
              >
                Сбросить
              </Button>
              <Button
                variant="contained"
                onClick={handleSearch}
                startIcon={
                  loading ? <CircularProgress size={20} /> : <SearchIcon />
                }
                sx={{
                  width: { xs: "100%", md: "auto" },
                  px: 4,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  "&:hover": {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  },
                }}
                disabled={loading}
              >
                {loading ? "Поиск..." : "Найти"}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default SearchBar;
